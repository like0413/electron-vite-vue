import { app, Tray, Menu, BrowserWindow, nativeImage } from 'electron'
import openSetting from './openSetting'
import Store from 'electron-store'

const store = new Store()

let tray: Tray | null = null

function createTray(win: BrowserWindow) {
  const iconPath = store.get('_icon_path_png') as string
  const iconPathIco = store.get('_icon_path_ico') as string

  const icon = nativeImage.createFromPath(process.platform === 'darwin' ? iconPath : iconPathIco)
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
