import { app, BrowserWindow, shell, ipcMain, nativeTheme } from 'electron'
import { release } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import Store from 'electron-store'
import enableUpdate from './modules/enableUpdate'
import createTray from './modules/createTray'
import registerGlobalShortcut from './modules/registerGlobalShortcut'
import setTasksList from './modules/setTasksList'
import setApplicationMenu from './modules/setApplicationMenu'
import registerIPCHandlers from './modules/registerIPCHandlers'
import setContextmenu from './modules/setContextmenu'
import mainToRender from './modules/mainToRender'
import setDockMenu from './modules/setDockMenu'
import fs from 'fs'

const appPath = app.getAppPath()
const pkgPath = resolve(appPath, './package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

const store = new Store()

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

let quit = false

const APP_URL = process.env.VITE_DEV_SERVER_URL ? 'https://alpha.tingkelai.com/tingkelai' : pkg.appUrl
const preload = join(__dirname, '../preload/index.mjs') //! 注意：这里是mjs，是在 dist-electron目录里查找
const ICON_PATH_PNG = join(__dirname, '../../build/icon.png')
const ICON_PATH_ICO = join(__dirname, '../../build/icon.ico')
const ICON_PATH_TEMPLATE = join(__dirname, '../../build/iconTemplate.png')

store.clear()
store.set('_preload_path', preload)
store.set('_icon_path_png', ICON_PATH_PNG)
store.set('_icon_path_ico', ICON_PATH_ICO)
store.set('_icon_path_template', ICON_PATH_TEMPLATE)
store.set('_server_url', process.env.VITE_DEV_SERVER_URL ?? '')

async function createWindow() {
  win = new BrowserWindow({
    show: false, // 先隐藏窗口，等待渲染进程准备好后再显示
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    center: true,
    title: '听客来', // 窗口左上角标题（会被网页标题覆盖）
    icon: ICON_PATH_PNG, // 窗口左上角图标（非网页图标，网页图标在index.html里设置）
    webPreferences: {
      preload,
    },
  })

  win.loadURL(APP_URL)

  win.on('ready-to-show', () => {
    win.show()
  })

  win.webContents.on('did-finish-load', () => {
    // 主进程向渲染进程发送消息
    mainToRender(win)
    // 启用更新
    setTimeout(() => {
      enableUpdate()
    }, 10 * 1000)
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
      win.hide()
    }
  })
}

app.whenReady().then(async () => {
  nativeTheme.themeSource = 'light'
  // 设置任务栏列表
  setTasksList()
  // 设置标题栏菜单
  setApplicationMenu()
  // 设置 dock menu(macos)
  // setDockMenu()
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

app.on('before-quit', (event) => {
  quit = true
})
