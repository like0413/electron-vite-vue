import { BrowserWindow, Menu } from 'electron'

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
      accelerator: 'CommandOrControl+R',
      role: 'reload',
    },
  ])
  return menu
}

function setContextmenu(win: BrowserWindow) {
  win.webContents.on('context-menu', (e, params) => {
    e.preventDefault()
    const menu = setMenuTemplate()
    menu.popup()
  })
}

export default setContextmenu
