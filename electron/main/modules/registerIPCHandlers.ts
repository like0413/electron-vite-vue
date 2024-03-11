import { app, ipcMain, BrowserWindow } from 'electron'
import * as address from 'address'
import { autoUpdater } from 'electron-updater'

function registerIPCHandlers(win: BrowserWindow) {
  // 监听设置开机自启事件
  ipcMain.handle('is-boot-launch', () => app.getLoginItemSettings().openAtLogin)
  ipcMain.handle('set-boot-launch', (event, flag) => {
    app.setLoginItemSettings({
      openAtLogin: flag,
    })
    return app.getLoginItemSettings().openAtLogin
  })

  // 页面缩放
  ipcMain.handle('get-zoom-level', () => win.webContents.zoomFactor)
  ipcMain.handle('zoom', (event, factor) => {
    win!.webContents.zoomFactor = factor
  })

  // 检查更新
  ipcMain.handle('check-update', async () => {
    autoUpdater.checkForUpdates()
  })

  // 监听获取 mac 地址事件
  ipcMain.handle('get-mac-address', async () => {
    return await new Promise((resolve, reject) => {
      address.mac(function (err: any, addr: string) {
        if (err) reject(err)
        resolve(addr.replace(/:/g, '-'))
      })
    })
  })

  // 监听获取版本信息事件
  ipcMain.handle('get-version', async () => {
    const version = process.versions
    const chromeVersion = version.chrome
    const electronVersion = version.electron
    const appVersion = app.getVersion()
    const appPath = app.getAppPath()

    return {
      appVersion,
      chromeVersion,
      electronVersion,
      appPath,
    }
  })
}

export default registerIPCHandlers
