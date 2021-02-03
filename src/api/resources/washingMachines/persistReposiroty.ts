import { ApplianceStatus } from '../../common/enums/enums'
import { generateId } from '../../../utils/generators'
import { IRepository } from '../../common/interfaces/repository'
import { IWashingMachine } from './model'

class PersistWashingMachineReposiroty implements IRepository<IWashingMachine> {
    private static instance: PersistWashingMachineReposiroty;
    /** name for storage */
    private _name: string = 'washingMachines'

    /** persisting  storage  */
    private _storage = require('node-persist')

    /** Get only one instance of class */
    static getInstance (): PersistWashingMachineReposiroty {
      if (!PersistWashingMachineReposiroty.instance) {
        PersistWashingMachineReposiroty.instance = new PersistWashingMachineReposiroty()
      }
      return PersistWashingMachineReposiroty.instance
    }

    async getAll () : Promise<IWashingMachine[]> {
      return this._storage.getItem(this._name)
    }

    async create (item: IWashingMachine) : Promise<IWashingMachine> {
      const washingMachines = await this.getAll()
      const id = generateId()
      item.id = id
      item.createdAt = new Date()
      item.activeCommands = []
      if (!item.status) {
        item.status = ApplianceStatus.OFFLINE
      }
      if (washingMachines) {
        await this._storage.updateItem(this._name, [...washingMachines, item])
      } else {
        await this._storage.updateItem(this._name, [item])
      }

      return item
    };

    async update (item: IWashingMachine) : Promise<void> {
      const washingMachines = await this.getAll() || []
      const index = washingMachines.findIndex((element) => element.id === item.id)
      if (index !== -1) {
        if (!item.activeCommands) {
          item.activeCommands = washingMachines[index].activeCommands
        }
        if (!item.name) {
          item.name = washingMachines[index].name
        }
        if (!item.status) {
          item.status = washingMachines[index].status
        }
        washingMachines.splice(index, 1, item)
        await this._storage.updateItem(this._name, washingMachines)
      }
    };

    async getById (itemId: string) {
      const list = await this.getAll() || []
      const appliance = list.find((x) => x.id === itemId)
      return appliance
    };

    async deleteById (itemId: string):Promise<void> {
      const appliances = await this.getAll()
      const newAppliances = appliances.filter((item) => item.id !== itemId)

      await this._storage.updateItem(this._name, newAppliances)
    };

    delete ():Promise<void> {
      return this._storage.removeItem(this._name)
    };
}

export default PersistWashingMachineReposiroty.getInstance()
