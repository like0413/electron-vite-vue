import { app, Menu } from 'electron'

function setDockMenu() {
  if (process.platform !== 'darwin') return

  const dockMenu = Menu.buildFromTemplate([
    {
      label: '新建窗口',
      click() {
        console.log('New Window')
      },
    },
    {
      label: '新建标签',
      click() {
        console.log('New Tab')
      },
    },
  ])
  app.dock.setMenu(dockMenu)
}

export default setDockMenu
