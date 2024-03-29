import { app, BrowserWindow, shell, ipcMain, nativeTheme, globalShortcut } from 'electron'
import { release } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs'
import enableUpdate from './modules/enableUpdate'
import createTray from './modules/createTray'
import registerGlobalShortcut from './modules/registerGlobalShortcut'
import setTasksList from './modules/setTasksList'
import setApplicationMenu from './modules/setApplicationMenu'
import registerIPCHandlers from './modules/registerIPCHandlers'
import setContextmenu from './modules/setContextmenu'
import mainToRender from './modules/mainToRender'
import log from 'electron-log/main'

const appPath = app.getAppPath()
const pkgPath = path.resolve(appPath, './package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

globalThis.__filename = fileURLToPath(import.meta.url)
globalThis.__dirname = path.dirname(__filename)

process.env.ROOT = path.join(__dirname, '..') // dist-electron
process.env.DIST = path.join(process.env.ROOT, '../dist') // dist
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL ? path.join(process.env.ROOT, '../public') : process.env.DIST

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

const APP_URL = process.env.VITE_DEV_SERVER_URL ? 'https://alpha.tingkelai.com/tingkelai' : pkg.appUrl
const PRELOAD_PATH = path.join(__dirname, '../preload/index.mjs') //! 注意：这里是mjs，是在 dist-electron目录里查找
const ICON_PATH = path.join(process.env.VITE_PUBLIC, './icon.png')

let win: BrowserWindow | null = null

let quit = false

async function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    center: true,
    title: '听客来', // 窗口左上角标题（会被网页标题覆盖）
    icon: ICON_PATH,
    webPreferences: {
      preload: PRELOAD_PATH,
    },
  })

  win.loadURL(APP_URL)

  win.maximize()
  win.show()

  win.webContents.on('dom-ready', () => {
    // 主进程向渲染进程发送消息
    mainToRender(win)
    // 启用更新
    enableUpdate()
  })

  // 在应用中点击 https:// 开头的链接时，用默认浏览器中打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // 右上角关闭窗口时，不要退出应用
  win.on('close', function (event) {
    if (!quit) {
      event.preventDefault()
      if (win.isFullScreen()) {
        win.setFullScreen(false)
      } else if (win.isMaximized()) {
        win.unmaximize()
      }
      win.hide()
    }
  })

  win.on('blur', () => {
    globalShortcut.unregisterAll()
  })
  win.on('focus', () => {
    registerGlobalShortcut(win)
  })
}

app.whenReady().then(async () => {
  // 设置任务栏列表
  setTasksList()
  // 设置标题栏菜单
  setApplicationMenu()
  // 创建主窗口
  await createWindow()
  // 注册处理程序（接收渲染进程发来的消息）
  registerIPCHandlers(win)
  // 创建托盘
  createTray(win)
  // 注册全局快捷键
  registerGlobalShortcut(win)
  // 设置 context menu
  setContextmenu(win)
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
  if (win === null) {
    createWindow()
  } else {
    if (win.isMinimized()) win.restore()
    win.show()
  }
})

// 当所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 禁用系统默认的右键菜单
app.on('browser-window-created', (event, win) => {
  win.webContents.on('context-menu', (e) => {
    e.preventDefault()
  })
})

// quit标志，避免macOS的dock图标右键点击退出时，无法退出
app.on('before-quit', (event) => {
  quit = true
})
