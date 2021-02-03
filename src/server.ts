import cors from 'cors'
import 'reflect-metadata'
import debug from 'debug'
import helmet from 'helmet'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { error } from '../src/api/middlewares/error'
import getMainRoutes from './api'
import CommandsController from './api/resources/commands/controller'
import WashingMachineController from './api/resources/washingMachines/controller'
require('dotenv').config()
const storage = require('node-persist')

/**
 * Create express server
 * @param washingMachinesController - realisation of Appliance Controller
 * @param commandsController - realisation of Commands Controller
 */
export function createServer (washingMachinesController: WashingMachineController, commandsController: CommandsController) {
  /** server log */
  const log = debug('server:log')

  /** express server */
  const server: Application = express()

  /** Get env variables  */
  server.set('host', process.env.HOST)
  server.set('port', +process.env.PORT)

  server.use(helmet())
  server.use(cors())
  server.use(bodyParser.json())

  server.use('/api', getMainRoutes(washingMachinesController, commandsController))

  server.use(error())
  storage.init()

  // Start server
  server.listen(server.get('port'), () => log(`Server is listening on port ${server.get('port')}!`))

  return server
}
