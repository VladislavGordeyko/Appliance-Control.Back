
import CommandsController from './api/resources/commands/controller'
import persistCommandsReposiroty from './api/resources/commands/persistReposiroty'
import CommandServices from './api/resources/commands/services'
import WashingMachineController from './api/resources/washingMachines/controller'
import persistWashingMachineReposiroty from './api/resources/washingMachines/persistReposiroty'
import WashingMachineServices from './api/resources/washingMachines/services'
import { createServer } from './server'

/** New instace of controllers with Command and WashingMachine service realisation */
const commandsServices = new CommandServices(persistCommandsReposiroty)
const commandsController = new CommandsController(commandsServices)
const washingMachineServices = new WashingMachineServices(persistWashingMachineReposiroty)
const washingMachineController = new WashingMachineController(washingMachineServices, commandsServices)

createServer(washingMachineController, commandsController)
