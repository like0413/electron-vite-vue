import { BrowserWindow } from 'electron'

function mainSendToRender(win: BrowserWindow) {
  win.webContents.send('mac-address', 'like')
}

export default mainSendToRender
