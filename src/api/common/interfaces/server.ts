import errors from '../errors'

/** Server error type */
export type IServerErrorCode = keyof (typeof errors);

/** interface of Server response */
export interface IServerResponse {
    success: boolean;
    [key: string]: any;
}
