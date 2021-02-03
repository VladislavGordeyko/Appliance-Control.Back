import { generateId } from '../../../utils/generators'
import { IRepository } from '../../common/interfaces/repository'
import { ICommand } from './model'

class PersistCommandsReposiroty implements IRepository<ICommand> {
    private static instance: PersistCommandsReposiroty;
    /** name for storage */
    private _name: string = 'commands'

    /** persisting  storage  */
    private _storage = require('node-persist')

    /** Get only one instance of class */
    static getInstance (): PersistCommandsReposiroty {
      if (!PersistCommandsReposiroty.instance) {
        PersistCommandsReposiroty.instance = new PersistCommandsReposiroty()
      }
      return PersistCommandsReposiroty.instance
    }

    async getAll () : Promise<ICommand[]> {
      return this._storage.getItem(this._name)
    }

    async create (item: ICommand) : Promise<ICommand> {
      const commands = await this.getAll()
      item.id = generateId()

      if (commands) {
        await this._storage.updateItem(this._name, [...commands, item])
      } else {
        await this._storage.updateItem(this._name, [item])
      }

      return item
    };

    async update (item: ICommand) : Promise<void> {
      const commands = await this.getAll() || []
      const index = commands.findIndex((element) => element.id === item.id)

      /** If command with id doesnt exist throw error */
      if (index !== -1) {
        commands.splice(index, 1, item)
        await this._storage.updateItem(this._name, commands)
      }
    };

    async getById (itemId: string) {
      const list = await this.getAll() || []
      const command = list.find((x) => x.id === itemId)
      return command
    };

    async deleteById (itemId: string):Promise<void> {
      const commands = await this.getAll()
      const newCommands = commands.filter((item) => item.id !== itemId)

      await this._storage.updateItem(this._name, newCommands)
    };

    delete ():Promise<void> {
      return this._storage.removeItem(this._name)
    };
}

export default PersistCommandsReposiroty.getInstance()
