import { generateId } from '../../../../utils/generators'
import { IRepository } from '../../../common/interfaces/repository'
import { IWashingMachine } from '../model'
import { mockWashingMachineData } from './mockData'

class MockWashinMachineRepo implements IRepository<IWashingMachine> {
    private static instance: MockWashinMachineRepo;

    private _storage = mockWashingMachineData

    /** Get only one instance of class */
    static getInstance (): MockWashinMachineRepo {
      if (!MockWashinMachineRepo.instance) {
        MockWashinMachineRepo.instance = new MockWashinMachineRepo()
      }
      return MockWashinMachineRepo.instance
    }

    async getAll () : Promise<IWashingMachine[]> {
      return this._storage
    }

    async create (item: IWashingMachine) : Promise<IWashingMachine> {
      const commands = await this.getAll()
      item.id = generateId()

      if (commands) {
        this._storage = [...commands, item]
      } else {
        this._storage = [item]
      }

      return item
    };

    async update (item: IWashingMachine) : Promise<void> {
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

export default MockWashinMachineRepo.getInstance()
