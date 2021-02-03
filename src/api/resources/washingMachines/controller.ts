
import { IWashingMachine } from './model'
import { ICommand } from '../commands/model'
import { RequestHandler } from 'express'
import { ServerResponse } from '../../../utils/ServerResponce'
import { ServerError } from '../../../utils/ServerError'
import { ICRUD } from '../../common/interfaces/crud'
import { IWashingMachineServices } from './interfaces'

/** Washing Machine Controller */
class WashingMachineController {
  /** Washing Machine service instance */
  private _washingMachinesServices: IWashingMachineServices

  /** Commands service instance */
  private _commandsService: ICRUD<ICommand>

  constructor (WashingMachinesServices: IWashingMachineServices, CommandServices: ICRUD<ICommand>) {
    this._washingMachinesServices = WashingMachinesServices
    this._commandsService = CommandServices
  }

  /** Get all appliances */
  list: RequestHandler = async (req, res, next) => {
    try {
      const washingMachines = await this._washingMachinesServices.list() || []

      res.json(
        ServerResponse.success({
          washingMachines
        })
      )
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Get appliance by id */
  get: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params
      const washingMachine = await this._washingMachinesServices.getById(id)

      res.json(
        ServerResponse.success(
          washingMachine
        )
      )
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Create new appliance */
  post: RequestHandler = async (req, res, next) => {
    try {
      const washingMachineData: IWashingMachine = req.body

      const created = await this._washingMachinesServices.create(washingMachineData)

      res.json(ServerResponse.success(created))
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Updating appliance */
  put: RequestHandler = async (req, res, next) => {
    try {
      const washingMacineUpdateData: IWashingMachine = req.body

      await this._washingMachinesServices.update(washingMacineUpdateData)

      res.json(ServerResponse.success())
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Delete all appliances */
  deleteAll: RequestHandler = async (req, res, next) => {
    try {
      await this._washingMachinesServices.delete()

      res.json(ServerResponse.success())
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Delete aplliance by id */
  deleteById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params
      await this._washingMachinesServices.deleteById(id)

      res.json(ServerResponse.success())
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Add Active command to appliance */
  addActiveCommand: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params
      const { commandId } = req.body
      const command = await this._commandsService.getById(commandId)

      await this._washingMachinesServices.createActiveCommand(id, command)

      res.json(ServerResponse.success())
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Delete Active command from appliance */
  deleteActiveCommand: RequestHandler = async (req, res, next) => {
    try {
      const { id, commandId } = req.params
      await this._washingMachinesServices.deleteActiveCommand(id, commandId)

      res.json(ServerResponse.success())
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }
}

export default WashingMachineController
