import { app, Tray, Menu, BrowserWindow, nativeImage, nativeTheme, systemPreferences } from 'electron'
import openSetting from './openSetting'
import { getPath } from '../helpers'

let tray: Tray | null = null

function getIcon() {
  let iconPath = ''
  let size = 16
  if (process.platform === 'darwin') {
    if (nativeTheme.shouldUseDarkColors) {
      iconPath = getPath('../../build/tray_mac_light.png')
    } else {
      iconPath = getPath('../../build/tray_mac_dark.png')
    }
  } else {
    size = 64
    iconPath = getPath('../../build/icon.ico')
  }

  return nativeImage.createFromPath(iconPath).resize({ width: size, height: size })
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

  // mac系统需要监听操作系统的主题变化
  if (process.platform === 'darwin') {
    systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
      tray && tray.setImage(getIcon())
    })
  }
}

export default createTray
