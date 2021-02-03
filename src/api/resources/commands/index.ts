import { Router } from 'express'
import CommandsController from './controller'
// import persistCommandsReposiroty from './persistCommandsReposiroty'
// import CommandsServices from './services'

export default function getCommandsRoute (commandsController: CommandsController) {
  const route = Router()
  /** Commands route for GET */
  route.get('/', commandsController.list)

  /** Commands route for GET by ID */
  route.get('/:id', commandsController.get)

  /** Commands route for POST */
  route.post('/', commandsController.post)

  /** Commands route for PUT */
  route.put('/', commandsController.put)

  /** Commands route for DELETE */
  // route.delete('/', deleteAll)

  /** Commands route for DELETE by ID */
  route.delete('/:id', commandsController.deleteById)

  return route
}
