import { BrowserWindow, Menu } from 'electron'
import openSetting from './openSetting'

function setMenuTemplate() {
  const menu = Menu.buildFromTemplate([
    {
      label: '复制',
      accelerator: 'CommandOrControl+C',
      role: 'copy',
    },
    {
      label: '粘贴',
      accelerator: 'CommandOrControl+V',
      role: 'paste',
    },
    {
      label: '刷新',
      accelerator: 'Shift+CommandOrControl+R',
      role: 'reload',
    },
    {
      label: '控制台',
      accelerator: 'Shift+CommandOrControl+P',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.webContents.toggleDevTools()
        }
      },
    },
    {
      label: '设置',
      click: () => {
        openSetting()
      },
    },
  ])
  return menu
}

function setContextmenu(win: BrowserWindow) {
  win.webContents.on('context-menu', (e, params) => {
    const menu = setMenuTemplate()
    if (menu) {
      e.preventDefault()
      menu.popup({
        window: win,
        x: params.x,
        y: params.y,
      })
    }
  })
}

export default setContextmenu
