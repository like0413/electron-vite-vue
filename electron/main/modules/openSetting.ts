import { app, BrowserWindow } from 'electron'

function openSetting(preload: string, viteDevServerUrl: string) {
  let settingWindow = new BrowserWindow({
    show: false,
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
}

export default openSetting
