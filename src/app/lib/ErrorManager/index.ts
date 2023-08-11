import { AxiosError } from 'axios';

import { HTTPStatus, IAPIErrorResponse } from './types';

class APIError extends Error {
  statusCode: number | null;
  errorType: string | null;
  errorMessage: string;
  isAxiosError: boolean;

  constructor(error: AxiosError<IAPIErrorResponse> | Error) {
    super(error.message);

    if ('isAxiosError' in error) {
      const axiosError: AxiosError<IAPIErrorResponse> = error;
      const { status, data } = axiosError.response || {};

      this.statusCode = status || null;
      this.errorType = data?.errorType || null;
      this.errorMessage = data?.errorMessage || error.message || '';
      this.isAxiosError = true;
    } else {
      this.statusCode = null;
      this.errorType = null;
      this.errorMessage = error.message || '';
      this.isAxiosError = false;
    }

    Object.setPrototypeOf(this, APIError.prototype);
  }

  /** @description HTTPStatusCode enum 반환 */
  get statusEnum(): HTTPStatus {
    if (!this.statusCode) return HTTPStatus.Null;
    return Math.floor(this.statusCode / 100);
  }
}

class ErrorManager {
  private fallbackErrorMessage = '서비스가 원활하지 않습니다.';

  alert(error: Error | any): void {
    alert(error?.message || this.fallbackErrorMessage);
  }
}

const instance = new ErrorManager();
export default instance;
