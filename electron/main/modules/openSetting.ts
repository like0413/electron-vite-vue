import { app, BrowserWindow } from 'electron'

let settingWindow: BrowserWindow | null = null

function openSetting(preload: string, viteDevServerUrl: string, iconPath: string) {
  if (settingWindow) {
    settingWindow.show()
    settingWindow.focus()
    return
  }

  settingWindow = new BrowserWindow({
    title: '设置',
    show: false,
    icon: iconPath,
    webPreferences: {
      preload,
    },
  })

  if (viteDevServerUrl) {
    settingWindow.loadURL(viteDevServerUrl + '#/setting')
  } else {
    settingWindow.loadURL(app.getAppPath() + '/dist/index.html#/setting')
  }

  settingWindow.once('ready-to-show', () => {
    settingWindow.show()
    settingWindow.focus()
  })
  settingWindow.on('closed', () => {
    settingWindow.destroy()
    settingWindow = null
  })

  settingWindow.webContents.openDevTools()
}

export default openSetting
