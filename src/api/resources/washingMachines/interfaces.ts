import { ICRUD } from '@/api/common/interfaces/crud'
import { ICommand } from '../commands/model'
import { IWashingMachine } from './model'

/** Extend iterface for Appliance service */
export interface IWashingMachineServices extends ICRUD<IWashingMachine> {
    /** Create active command for appliance */
    createActiveCommand: (itemId: string, command: ICommand) => Promise<void>,

     /** Delete active command for appliance */
    deleteActiveCommand: (itemId: string, activeCommandId: string) => Promise<void>,
}
