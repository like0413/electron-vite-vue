import { app, BrowserWindow } from 'electron'
import { getPath } from '../helpers'

let win: BrowserWindow | null = null

function openSetting() {
  const preload = getPath('../preload/index.mjs')
  const icon = getPath('../../build/icon.png')

  if (win) {
    win.show()
    win.focus()
    return
  }

  win = new BrowserWindow({
    width: 700,
    height: 500,
    frame: false,
    show: false,
    icon,
    webPreferences: {
      preload,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL + '#/setting')
  } else {
    win.loadURL(app.getAppPath() + '/dist/index.html#/setting')
  }

  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })
  win.on('closed', () => {
    win.destroy()
    win = null
  })
}

export default openSetting
