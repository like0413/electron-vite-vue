import { app, BrowserWindow, globalShortcut } from 'electron'

function registerGlobalShortcut(win: BrowserWindow) {
  // shift + ctl + p，打开开发者工具
  globalShortcut.register('Shift+CommandOrControl+P', () => {
    win.webContents.toggleDevTools()
  })
  // shift + ctl + r，刷新页面
  globalShortcut.register('Shift+CommandOrControl+R', () => {
    win.reload()
  })
}

export default registerGlobalShortcut
