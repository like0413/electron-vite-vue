import { app, ipcMain, BrowserWindow } from 'electron'
import * as address from 'address'

function registerIPCHandlers(win: BrowserWindow) {
  // 监听获取 mac 地址事件
  ipcMain.handle('get-mac-address', async () => {
    return await new Promise((resolve, reject) => {
      address.mac(function (err: any, addr: string) {
        if (err) reject(err)
        resolve(addr.replace(/:/g, '-'))
      })
    })
  })
}

export default registerIPCHandlers
