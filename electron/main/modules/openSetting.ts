import { app, BrowserWindow } from 'electron'
import { join, dirname, resolve } from 'node:path'
import log from 'electron-log/main'
import { fileURLToPath, URL } from 'node:url'

let win: BrowserWindow | null = null

function openSetting() {
  const preload = join(__dirname, '../preload/index.mjs')
  const icon = join(process.env.VITE_PUBLIC, './icon.png')

  if (win) {
    win.show()
    win.focus()
    return
  }

  win = new BrowserWindow({
    width: 700,
    height: 500,
    frame: false,
    title: '设置',
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

  win.on('closed', () => {
    win.destroy()
    win = null
  })
}

export default openSetting
