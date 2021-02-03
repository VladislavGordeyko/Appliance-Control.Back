import cors from 'cors'
import 'reflect-metadata'
import helmet from 'helmet'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { error } from '../src/api/middlewares/error'
import getMainRoutes from './api'
import CommandsController from './api/resources/commands/controller'
import WashingMachineController from './api/resources/washingMachines/controller'
require('dotenv').config()
const storage = require('node-persist')

export function createServer (washingMachinesController: WashingMachineController, commandsController: CommandsController) {
  const server: Application = express()
  server.set('host', process.env.HOST)
  server.set('port', +process.env.PORT)

  server.use(helmet())
  server.use(cors())
  server.use(bodyParser.json())

  server.use('/api', getMainRoutes(washingMachinesController, commandsController))

  server.use(error())

  storage.init()

  // Start server
  server.listen(server.get('port'), () => console.log(`Server is listening on port ${server.get('port')}!`))

  return server
}
