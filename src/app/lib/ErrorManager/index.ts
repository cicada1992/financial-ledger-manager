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
  private serverErrorMessage = '서버가 원활하지 않습니다.';
  private fallbackErrorMessage = '서비스가 원활하지 않습니다.';

  /**
   * Axios Error 인터셉트 후 APIError 인스턴스로 wrapping
   * @deprecated Axios middleware 밖에선 사용하지 않습니다.
   */
  interceptAxiosError(error: AxiosError): Promise<void> {
    console.log({ error });
    return Promise.reject(new APIError(error));
  }

  private extractErrorContent(error: APIError | Error | string | IAPIErrorResponse): string {
    /**
     * 응답값이 200으로 떨어지는데, 응답값으로 에러를 내려주는 경우
     * Axios Error 인터셉트 로직을 타지 않아서 APIError 객체는 아니지만
     * IAPIErrorResponse 타입의 객체가 들어올 수 있음
     * */
    if (error instanceof APIError || this.instanceOfIAPIErrorResponse(error)) {
      const isSeverError =
        !this.instanceOfIAPIErrorResponse(error) && error.statusEnum === HTTPStatus.ServerError;
      return isSeverError ? this.serverErrorMessage : error.errorMessage;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return error || this.fallbackErrorMessage;
  }

  private instanceOfIAPIErrorResponse(
    error: APIError | Error | string | IAPIErrorResponse,
  ): error is IAPIErrorResponse {
    return error.hasOwnProperty('errorType') && error.hasOwnProperty('errorMessage');
  }

  getErrorText(error: APIError | Error | string): string {
    return this.extractErrorContent(error);
  }
}

const instance = new ErrorManager();
export default instance;
