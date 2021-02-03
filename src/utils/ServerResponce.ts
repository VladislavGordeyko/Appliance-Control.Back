import { IServerResponse } from '../api/common/interfaces/server'

/** Server Response class */
export class ServerResponse {
  /**
   * Succes response
   * @param data - returning data
   */
  static success (data: any = null) {
    const result: IServerResponse = {
      success: true
    }

    if (data) {
      result.data = data
    }

    return result
  }
}
