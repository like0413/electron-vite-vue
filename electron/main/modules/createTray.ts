import { app, Tray, Menu, BrowserWindow, nativeImage, nativeTheme } from 'electron'
import openSetting from './openSetting'
import { getPath } from '../helpers'

let tray: Tray | null = null

function getIcon() {
  let iconPath = ''
  if (process.platform === 'darwin') {
    // if (nativeTheme.shouldUseDarkColors) {
    // iconPath = getPath('../../build/icon_mac_light.png')
    // } else {
    iconPath = getPath('../../build/iconTemplate.png')
    // }
  } else {
    iconPath = getPath('../../build/icon.ico')
  }

  return nativeImage.createFromPath(iconPath).resize({ width: 32, height: 32 })
}

function createTray(win: BrowserWindow) {
  tray = new Tray(getIcon())

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '设置',
      click: () => {
        openSetting()
      },
    },
    {
      label: '退出',
      click: function () {
        win.destroy()
        win = null
        app.quit()
      },
    },
  ])

  tray.setContextMenu(contextMenu)

  tray.setToolTip('听客来')
  tray.setTitle('听客来')

  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
}

export default createTray
