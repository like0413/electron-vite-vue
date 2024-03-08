import { BrowserWindow } from 'electron'

function openSetting() {
  let settingWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  settingWindow.loadURL(`file://${__dirname}/setting.html`)
  settingWindow.on('closed', () => {
    settingWindow = null
    settingWindow.destroy()
  })
}


export default openSetting
