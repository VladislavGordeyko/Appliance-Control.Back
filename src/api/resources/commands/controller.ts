
import { ICommand } from './model'
import { RequestHandler } from 'express'
import { ServerResponse } from '../../../utils/ServerResponce'
import { ServerError } from '../../../utils/ServerError'
import { ICRUD } from '../../common/interfaces/crud'

/** Commands Controller */
class CommandsController {
  /** Commands service instance */
  private _commansService: ICRUD<ICommand>

  constructor (CommandsService: ICRUD<ICommand>) {
    this._commansService = CommandsService
  }

  /** Get all commands */
  list: RequestHandler = async (req, res, next) => {
    try {
      const commands = await this._commansService.list() || []

      res.json(
        ServerResponse.success({
          commands
        })
      )
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Get command by id */
  get: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params
      const command = await this._commansService.getById(id)

      res.json(
        ServerResponse.success(command)
      )
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Create new command */
  post: RequestHandler = async (req, res, next) => {
    try {
      const commandsData: ICommand = req.body
      const created = await this._commansService.create(commandsData)

      res.json(ServerResponse.success(created))
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Updating command  */
  put: RequestHandler = async (req, res, next) => {
    try {
      const commandsUpdateData: ICommand = req.body
      await this._commansService.update(commandsUpdateData)

      res.json(ServerResponse.success())
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Delete all commands */
  deleteAll: RequestHandler = async (req, res, next) => {
    try {
      await this._commansService.delete()

      res.json(ServerResponse.success())
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }

  /** Delete command by id */
  deleteById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params
      await this._commansService.deleteById(id)

      res.json(ServerResponse.success())
    } catch (e) {
      next(ServerError.fromError(e))
    }
  }
}

export default CommandsController
