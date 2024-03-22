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
  // 复制：CommandOrControl + C
  globalShortcut.register('CommandOrControl+C', () => {
    win.webContents.copy()
  })
  // 粘贴：CommandOrControl + V
  globalShortcut.register('CommandOrControl+V', () => {
    win.webContents.paste()
  })
}

export default registerGlobalShortcut
