import { ApplianceStatus, CommandStatus } from '../../common/enums/enums'
import { ServerError } from '../../../utils/ServerError'
import { createSchema, IActiveCommand, IWashingMachine, washinMachineUpdateSchema } from './model'
import { generateId } from '../../../utils/generators'
import { ICommand } from '../commands/model'
import { IWashingMachineServices } from './interfaces'
import moment from 'moment'
import { IRepository } from '@/api/common/interfaces/repository'
import { validate } from '../../../utils/validate'

/** Realisation of WashingMachine service */
class WashingMachineServices implements IWashingMachineServices {
  private static instance: WashingMachineServices;

  private _washingMachineRepository

  constructor (WashingMachineRepository : IRepository<IWashingMachine>) {
    this._washingMachineRepository = WashingMachineRepository
  }

  /** Get all aplliances from storage */
  async list (): Promise<IWashingMachine[]> {
    return this._washingMachineRepository.getAll()
  }

  /**
   * Get aplliance by id from storage
   * @param itemId - Washing Machine Id
   * */
  async getById (itemId:string) {
    const washingMachine = await this._washingMachineRepository.getById(itemId)
    if (washingMachine) {
      return washingMachine
    } else {
      throw new ServerError(20)
    }
  }

  /**
   * Create aplliance and save to storage
   * @param item - Washing Machine Object
   * */
  async create (item: IWashingMachine) {
    /** Validating request body data */
    validate(item, createSchema)

    return this._washingMachineRepository.create(item)
  }

  /** Deleting all aplliances from storage */
  async delete () {
    return this._washingMachineRepository.delete()
  }

  /** Deleting aplliance by id from storage */
  async deleteById (itemId:string) {
    const appliance = await this._washingMachineRepository.getById(itemId)

    /** If command with id doesnt exist throw error */
    if (appliance) {
      await this._washingMachineRepository.deleteById(itemId)
    } else {
      throw new ServerError(20)
    }
  }

  /**
   * Update aplliance and saving to storage
   * @param item Washing Machine object
   * */
  async update (item: IWashingMachine) {
    /** Validating request body data */
    validate(item, washinMachineUpdateSchema)

    if (item.status === ApplianceStatus.WORKING &&
      item.activeCommands.length === 0) {
      throw new ServerError(21)
    }
    const appliance = await this._washingMachineRepository.getById(item.id)

    /** If appliance with id doesnt exist throw error */
    if (appliance) {
      await this._washingMachineRepository.update(item)
    } else {
      throw new ServerError(20)
    }
  }

  /**
   * Get active commands of appliance
   * @param itemId - Appliance id
   * */
  async getActiveCommands (itemId: string) {
    const washingMachine = await this.getById(itemId)
    return washingMachine.activeCommands
  }

  /**
   * Get active commands of appliance
   * @param itemId - Appliance id
   * @param activeCommandId - Active Command ID
   * */
  async getActiveCommandById (itemId: string, activeCommandId: string) {
    const washingMachine = await this.getById(itemId)
    const activeCommand = washingMachine.activeCommands.find((x) => x.id === activeCommandId)
    if (activeCommand) {
      return activeCommand
    } else {
      throw new ServerError(40)
    }
  }

  /**
   * Creating Active command of Appliance
   * @param itemId - Appliance Id
   * @param command - Command object
   */
  async createActiveCommand (itemId: string, command: ICommand) {
    const washingMachine = await this.getById(itemId)
    const startAt = moment()
    const finishAt = startAt.add(command.duratation, 'minutes').toDate()
    const status = CommandStatus.INPROCESS
    const activeCommand : IActiveCommand = { id: generateId(), command, startAt: startAt.toDate(), finishAt, status }
    washingMachine.activeCommands = [activeCommand]
    washingMachine.status = ApplianceStatus.WORKING
    await this.update(washingMachine)
  }

  /**
   * Deleting Active command of Appliance
   * @param itemId - Appliance Id
   * @param activeCommandId - Active Command Id
   */
  async deleteActiveCommand (itemId: string, activeCommandId: string) {
    const washingMachine = await this.getById(itemId)
    const activeCommand = await this.getActiveCommandById(itemId, activeCommandId)
    const filtered = washingMachine.activeCommands.filter((item) => item.id !== activeCommand.id)
    washingMachine.activeCommands = filtered
    washingMachine.status = ApplianceStatus.IDLE
    await this.update(washingMachine)
  }
}

export default WashingMachineServices
