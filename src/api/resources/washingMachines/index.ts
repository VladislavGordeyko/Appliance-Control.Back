import { Router } from 'express'

import WashingMachineController from './controller'

export default function getCommandsRoute (washingMachineController: WashingMachineController) {
  const route = Router()
  /** Appliance route for GET */
  route.get('/', washingMachineController.list)

  /** Appliance route for GET by ID */
  route.get('/:id', washingMachineController.get)

  /** Appliance route for POST */
  route.post('/', washingMachineController.post)

  /** Appliance route for PUT */
  route.put('/', washingMachineController.put)

  /** Appliance route for DELETE */
  // route.delete('/', deleteAll)

  /** Appliance route for DELETE by ID */
  route.delete('/:id', washingMachineController.deleteById)

  /** Appliance route for adding active command */
  route.post('/:id/active.command', washingMachineController.addActiveCommand)

  /** Appliance route for deleting active command */
  route.delete('/:id/active.command/:commandId', washingMachineController.deleteActiveCommand)

  return route
}
