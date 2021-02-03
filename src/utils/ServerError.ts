import debug from 'debug'

import { IServerErrorCode } from '../api/common/interfaces/server'

import errors from '../api/common/errors'

const log = debug('server:ServerError')

/** Server error class */
export class ServerError {
  code: number;
  status: number;
  message: string;
  handler: string;

  constructor (code: IServerErrorCode, message: string = null) {
    const errObject = this.getErrorObject(code)

    this.handler = 'ServerError'
    this.code = code
    this.status = errObject.status
    this.message = message
      ? `${errObject.message}: '${message}'`
      : errObject.message
  }

  /**
   * Forming error
   * @param e - error
   */
  static fromError (e: Error | ServerError) {
    if ((<ServerError>e).handler === 'ServerError') {
      return e
    }

    log(e)

    return new ServerError(0, e.message)
  }

  /**
   * Get Error Object
   * @param code - error code
   */
  getErrorObject (code: IServerErrorCode) {
    return errors[code] || errors[0]
  }
}
