import { app, BrowserWindow } from 'electron'
import { getPath } from '../helpers'

let win: BrowserWindow | null = null

function openSetting() {
  const preload = getPath('../preload/index.mjs')
  const iconPathPng = getPath('../../build/icon.png')
  const viteDevServerUrl = getPath('../../build/icon.ico')

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
    icon: iconPathPng,
    webPreferences: {
      preload,
    },
  })

  if (viteDevServerUrl) {
    win.loadURL(viteDevServerUrl + '#/setting')
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
