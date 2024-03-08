import { Menu } from 'electron'

function setApplicationMenu() {
  const menu = Menu.buildFromTemplate([
    // {
    //   label: 'xxx',
    //   click: () => {},
    // },
  ])
  Menu.setApplicationMenu(menu)
}

export default setApplicationMenu
