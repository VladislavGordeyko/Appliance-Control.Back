import debug from 'debug'
import { ErrorRequestHandler } from 'express'

/** logger */
const log = debug('server:error')

/** Error middleware */
export const error = (): ErrorRequestHandler => (err, req, res, next) => {
  log(err)
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code,
      message: err.message
    }
  })
}
