import joi from 'joi'
import { validatingMessages } from '../../../utils/validate'

/** Command model */
export interface ICommand {
  /** ID */
  id: string,
  /** Command description */
  description: string,
  /** Durattaion in minutes */
  duratation: number
}

/** Command validation schema */
export const commandBasicSchema: joi.SchemaMap<ICommand> = {
  id: joi.string().optional(),
  description: joi.string().label('description').required(),
  duratation: joi.number().label('duratation').required()
}

/** Command-create validation schema */
export const createSchema = joi
  .object(commandBasicSchema)
  .unknown(false)
  .messages({ ...validatingMessages })

/** Command-update validation schema */
export const commandUpdateSchema = joi
  .object<ICommand>({
    id: joi.string().label('id').required(),
    description: joi.string().optional(),
    duratation: joi.number().optional()
  })
  .unknown(false)
  .messages({ ...validatingMessages })
