export interface IAPIErrorResponse {
  readonly errorMessage: string;
  readonly errorType: string;
}

export enum HTTPStatus {
  Null,
  Information,
  Success,
  Redirection,
  ClientError,
  ServerError,
}
