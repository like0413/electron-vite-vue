import { app, BrowserWindow, globalShortcut } from 'electron'

function registerGlobalShortcut(win: BrowserWindow) {
  // shift + ctl + i，打开开发者工具
  globalShortcut.register('Shift+CommandOrControl+I', () => {
    win.webContents.toggleDevTools()
  })
  // shift + ctl + r，刷新页面
  globalShortcut.register('Shift+CommandOrControl+R', () => {
    win.reload()
  })
}

export default registerGlobalShortcut
