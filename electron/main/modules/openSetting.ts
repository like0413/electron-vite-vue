import { app, BrowserWindow } from 'electron'
import { join, dirname, resolve } from 'node:path'
import log from 'electron-log/main'
import { fileURLToPath, URL } from 'node:url'

let win: BrowserWindow | null = null

function openSetting() {
  const preload = app.getAppPath() + '/dist-electron/preload/index.mjs'
  // join(dirname(fileURLToPath(import.meta.url)), '../preload/index.mjs')
  const icon = join(process.env.VITE_PUBLIC, './icon.png')

  log.info('setting preload:', preload)
  log.info('setting preload2:', join(dirname(fileURLToPath(import.meta.url)), '../preload/index.mjs'))
  log.info('setting icon:', icon)
  log.info('setting icon2:', app.getAppPath() + './dist/icon.png')

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

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    win.destroy()
    win = null
  })
}

export default openSetting
