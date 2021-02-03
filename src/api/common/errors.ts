/** List of Server errors */
export default {
  0: {
    status: 500,
    message: 'Server error'
  },
  1: {
    status: 404,
    message: 'Not Found'
  },
  10: {
    status: 400,
    message: 'Data validation error'
  },
  20: {
    status: 404,
    message: 'Washing machine not found'
  },
  21: {
    status: 403,
    message: 'Cannot set status ACTIVE if appliance doesnt have active command'
  },
  30: {
    status: 404,
    message: 'Command not found'
  },
  40: {
    status: 404,
    message: 'Active Command not found'
  }
}
