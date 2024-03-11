import { app, Tray, Menu, BrowserWindow, nativeImage } from 'electron'
import openSetting from './openSetting'

let tray: Tray | null = null

interface extraOptions {
  preload: string
  viteDevServerUrl: string
  iconPath: string
}

function createTray(win: BrowserWindow, iconPath: string, extraOptions: extraOptions) {
  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon)

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
        global.allowQuit = true
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
