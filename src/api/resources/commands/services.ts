import { ServerError } from '../../../utils/ServerError'
import { commandUpdateSchema, createSchema, ICommand } from './model'
import { ICRUD } from '../../common/interfaces/CRUD'
import { IRepository } from '../../common/interfaces/repository'
import { validate } from '../../../utils/validate'

/** Realisation of Command service */
class CommandServices implements ICRUD<ICommand> {
  private static instance: CommandServices;
  /** name for storage */
  private _name: string = 'commands'
  private _commandRepository

  constructor (CommandsRepository : IRepository<ICommand>) {
    this._commandRepository = CommandsRepository
  }

  /** Get only one instance of class */
  // static getInstance (): CommandServices {
  //   if (!CommandServices.instance) {
  //     CommandServices.instance = new CommandServices()
  //   }
  //   return CommandServices.instance
  // }

  /** Get all commands from storage */

  async list (): Promise<ICommand[]> {
    return this._commandRepository.getAll()
  }

  /**
   * Get command by id from storage
   * @param itemId - Command Id
   */
  async getById (itemId:string) {
    // const list = await this.list() || []
    const command = await this._commandRepository.getById(itemId)
    if (command) {
      return command
    } else {
      throw new ServerError(30)
    }
  }

  /**
   * Create command and save to storage
   * @param item -  Command Object
   */
  async create (item: ICommand) {
    /** Validationg request body data */
    validate(item, createSchema)

    return this._commandRepository.create(item)
  }

  /** Deleting all command from storage */
  async delete () {
    return this._commandRepository.delete()
  }

  /** Deleting command by id from storage */
  async deleteById (itemId:string) {
    const command = await this._commandRepository.getById(itemId)

    /** If command with id doesnt exist throw error */
    if (command) {
      await this._commandRepository.deleteById(itemId)
    } else {
      throw new ServerError(30)
    }
  }

  /**
   * Update command and saving to storage
   * @param item - Command Object
   */
  async update (item: ICommand) {
    /** Validating request body data */
    validate(item, commandUpdateSchema)

    const command = await this._commandRepository.getById(item.id)

    /** If command with id doesnt exist throw error */
    if (command) {
      await this._commandRepository.update(item)
    } else {
      throw new ServerError(30)
    }
  }
}

export default CommandServices
