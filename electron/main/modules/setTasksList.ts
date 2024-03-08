import { app } from 'electron'

function setTasksList() {
  app.setUserTasks([])
  app.setJumpList([])
}

export default setTasksList
