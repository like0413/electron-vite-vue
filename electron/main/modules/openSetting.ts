import { app, BrowserWindow } from 'electron'
import Store from 'electron-store'

const store = new Store()

let win: BrowserWindow | null = null

function openSetting() {
  const preload = store.get('_preload_path') as string
  const iconPath = store.get('_icon_path') as string
  const viteDevServerUrl = store.get('_server_url') as string

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
    icon: iconPath,
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
