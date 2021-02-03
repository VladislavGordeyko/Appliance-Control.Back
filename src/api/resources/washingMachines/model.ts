import { ApplianceStatus, CommandStatus } from '../../common/enums/enums'
import joi from 'joi'
import { validatingMessages } from '../../../utils/validate'
import { ICommand } from '../commands/model'

/** Active command of Appliance */
export interface IActiveCommand {
  /** ID */
  id: string,
  /** Command */
  command: ICommand,
  /** Command should start at  */
  startAt: Date | string,
  /** Command should finish at  */
  finishAt: Date | string,
  /** Current command status */
  status: CommandStatus
}

/** Appliance model */
export interface IWashingMachine {
  /** Id */
  id: string,
  /** Creation date */
  createdAt: string | Date,
  /** Appliance machine name */
  name: string,
  /** Current status of washing machine */
  status: ApplianceStatus,
  /** Active Commands  */
  activeCommands: IActiveCommand[]
}

/** Appliance validation schema */
export const washingMachineBasicSchema: joi.SchemaMap<IWashingMachine> = {
  id: joi.string().optional(),
  createdAt: joi.string().optional(),
  name: joi.string().label('name').required(),
  status: joi.string().valid(...Object.values(ApplianceStatus)).optional()
}

/** Appliance-create validation schema */
export const createSchema = joi
  .object(washingMachineBasicSchema)
  .unknown(false)
  .messages({ ...validatingMessages })

/** Appliance-edit validation schema */
export const washinMachineUpdateSchema = joi
  .object<IWashingMachine>({
    ...washingMachineBasicSchema,
    name: joi.string().optional(),
    id: joi.string().label('id').required(),
    activeCommands: joi.array().optional()
  })
  .unknown(false)
  .messages({ ...validatingMessages })
