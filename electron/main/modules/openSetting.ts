import { app, BrowserWindow } from 'electron'
import { join, dirname, resolve } from 'node:path'
import log from 'electron-log/main'
import { fileURLToPath, URL } from 'node:url'

let win: BrowserWindow | null = null

function openSetting() {
  const preload = join(__dirname, '../preload/index.mjs')
  const icon = join(process.env.VITE_PUBLIC, './icon.png')

  // log.info('0:::', __filename)
  // log.info('1:::', __dirname)
  // log.info('2:::', process.env.ROOT)
  // log.info('3:::', process.env.DIST)
  // log.info('4:::', process.env.VITE_PUBLIC)
  // log.info('5:::', join(__dirname, '../preload/index.mjs'))
  // log.info('6:::', join(process.env.ROOT, './preload/index.mjs'))
  // log.info('7:::', join(process.env.VITE_PUBLIC, './icon.png'))
  // log.info('8:::', join(process.env.DIST, './icon.png'))
  // log.info('9:::', app.getAppPath() + '/dist/index.html#/setting')
  // log.info('11:::', join(process.env.DIST, './index.html#/setting'))
  // log.info('12:::', join(__dirname, '../dist/index.html#/setting'))

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
    win.loadURL('file://' + app.getAppPath() + '/dist/index.html#/setting')
  }

  win.on('closed', () => {
    win.destroy()
    win = null
  })
}

export default openSetting
