import debug from 'debug'
import { Schema } from 'joi'

import { ServerError } from './ServerError'

const log = debug('server:log')

/**
 * Validate date and schema
 * @param data - Data possibly from request
 * @param schema - schema from model
 */
export const validate = <T>(data: T, schema: Schema) => {
  const { error, value } = schema.validate(data)

  if (error) {
    log(error)
    const {
      details: [{ message }]
    } = error
    throw new ServerError(10, message)
  }

  return value
}

/** Validation Messages */
export const validatingMessages = {
  'any.required': 'Field {{#label}} required',
  'string.empty': 'Field {{#label}} must be filled',
  'number.base': 'Field {{#label}} must be digits'
}
