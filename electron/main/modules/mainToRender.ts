import * as address from 'address'
import { BrowserWindow } from 'electron'

function mainToRender(win: BrowserWindow) {
  // 发送 mac 地址
  address.mac(function (err: any, addr: string) {
    if (err) return

    addr.replace(/:/g, '-').toUpperCase()
    win.webContents.send('get-mac-address', addr)
  })
}

export default mainToRender
