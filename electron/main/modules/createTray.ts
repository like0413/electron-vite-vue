import { app, Tray, Menu, BrowserWindow, nativeImage, nativeTheme, systemPreferences } from 'electron'
import { join, dirname, resolve } from 'node:path'
import openSetting from './openSetting'
import log from 'electron-log/main'

let tray: Tray | null = null

function getIcon() {
  let iconPath = ''
  let size = 32
  if (process.platform === 'darwin') {
    if (nativeTheme.shouldUseDarkColors) {
      iconPath = join(process.env.VITE_PUBLIC, './icon_mac_light.png')
    } else {
      iconPath = join(process.env.VITE_PUBLIC, './icon_mac_dark.png')
    }
  } else {
    size = 64
    iconPath = join(process.env.VITE_PUBLIC, './icon.png')
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
  // tray.setTitle('听客来')

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
