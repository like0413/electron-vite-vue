import { app, BrowserWindow } from 'electron'

function openSetting(preload: string, viteDevServerUrl: string, iconPath: string) {
  let settingWindow = new BrowserWindow({
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
