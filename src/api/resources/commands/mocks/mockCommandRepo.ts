import { generateId } from '../../../../utils/generators'
import { IRepository } from '../../../common/interfaces/repository'
import { ICommand } from '../model'
import { mockCommandsData } from './mockData'

class MockCommandRepo implements IRepository<ICommand> {
    private static instance: MockCommandRepo;

    private _storage = mockCommandsData

    /** Get only one instance of class */
    static getInstance (): MockCommandRepo {
      if (!MockCommandRepo.instance) {
        MockCommandRepo.instance = new MockCommandRepo()
      }
      return MockCommandRepo.instance
    }

    async getAll () : Promise<ICommand[]> {
      return this._storage
    }

    async create (item: ICommand) : Promise<ICommand> {
      const commands = await this.getAll()
      item.id = generateId()

      if (commands) {
        this._storage = [...commands, item]
      } else {
        this._storage = [item]
      }

      return item
    };

    async update (item: ICommand) : Promise<void> {
      const commands = await this.getAll() || []
      const index = commands.findIndex((element) => element.id === item.id)

      /** If command with id doesnt exist throw error */
      if (index !== -1) {
        commands.splice(index, 1, item)
        this._storage = commands
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

      this._storage = newCommands
    };

    delete ():Promise<void> {
      this._storage = []
      return null
    };
}

export default MockCommandRepo.getInstance()
