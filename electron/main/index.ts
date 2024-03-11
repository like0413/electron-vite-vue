import { app, BrowserWindow, shell, ipcMain, nativeTheme } from 'electron'
import { release } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import getInnerAppUrl from './helpers/getInnerAppUrl'
import enableUpdate from './modules/enableUpdate'
import createTray from './modules/createTray'
import registerGlobalShortcut from './modules/registerGlobalShortcut'
import setTasksList from './modules/setTasksList'
import setApplicationMenu from './modules/setApplicationMenu'
import registerIPCHandlers from './modules/registerIPCHandlers'
import mainSendToRender from './modules/mainSendToRender'

globalThis.__filename = fileURLToPath(import.meta.url)
globalThis.__dirname = dirname(__filename)

process.env.ROOT = join(__dirname, '..')
process.env.DIST = join(process.env.ROOT, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.ROOT, '../public') : process.env.DIST

// 禁用 Windows 7的GPU加速
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// 为Windows 10+通知设置应用程序名称
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// 如果应用尝试启动第二个实例，应用将退出
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// 关闭 electron security 警告（此警告仅在开发模式中显示）
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// ---------------------------------------------主要逻辑---------------------------------------------------

let win: BrowserWindow | null = null

const APP_URL = getInnerAppUrl()
const preload = join(__dirname, '../preload/index.mjs') //! 注意：这里是mjs，是在 dist-electron目录里查找
const ICON_PATH = join(process.env.VITE_PUBLIC, 'favicon.ico')

async function createWindow() {
  win = new BrowserWindow({
    title: '听客来', // 窗口左上角标题（可能会被网页标题覆盖）
    icon: ICON_PATH, // 窗口左上角图标（非网页图标，网页图标在index.html里设置）
    webPreferences: {
      preload,
    },
  })

  win.loadURL(APP_URL)

  // 在应用中点击 https:// 开头的链接时，用默认浏览器中打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  win.webContents.on('did-finish-load', () => {
    // 主动向渲染进程发送消息
    mainSendToRender(win)
    // 启用更新（放在did-finish-load事件并在8秒后检查，用户友好）
    setTimeout(() => {
      enableUpdate()
    }, 8000)
  })

  // 右上角关闭窗口时，不要退出应用
  win.on('close', function (event) {
    if (!global.allowQuit) {
      event.preventDefault()
      win.hide()
    }
  })
}

app.whenReady().then(() => {
  nativeTheme.themeSource = 'light'
  // 设置任务栏列表
  setTasksList()
  // 设置标题栏菜单
  setApplicationMenu()
  // 创建主窗口
  createWindow().then(() => {
    // 注册处理程序（接收渲染进程发来的消息）
    registerIPCHandlers(win)
    // 创建托盘
    createTray(win, ICON_PATH, {
      preload,
      viteDevServerUrl: process.env.VITE_DEV_SERVER_URL,
      iconPath: ICON_PATH,
    })
    // 注册全局快捷键
    registerGlobalShortcut(win)
  })
})

// 如果试图打开另一个主窗口，则focus在主窗口上，而不是打开另一个窗口
// 需要调用app.requestSingleInstanceLock()且返回false
app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

// 当应用程序激活时，如果没有窗口，则创建一个新窗口
app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// 当所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})
