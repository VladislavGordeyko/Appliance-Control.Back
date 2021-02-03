
import { Router } from 'express'
import washingMachines from './resources/washingMachines'

import CommandsController from './resources/commands/controller'
import getCommandsRoute from './resources/commands'
import WashingMachineController from './resources/washingMachines/controller'

const getMainRoutes = (washingMachinesController: WashingMachineController, commandsController: CommandsController) => {
  const api: Router = Router()

  api.use('/washingMachines', washingMachines(washingMachinesController))
  api.use('/commands', getCommandsRoute(commandsController))

  return api
}
export default getMainRoutes
