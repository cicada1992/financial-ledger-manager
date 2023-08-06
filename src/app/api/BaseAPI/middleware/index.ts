import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import responseMiddleware from './reponseMiddleware';
import { ResponseMiddleware } from '../types';

export default class WithMiddleware {
  protected readonly instance: AxiosInstance;

  private readonly responseMiddlewares: ResponseMiddleware[];

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.responseMiddlewares = [responseMiddleware.auth];

    this.initInterceptors();
  }

  private initInterceptors() {
    const { interceptors } = this.instance;
    interceptors.response.use((res) => this.handleResponse(res));
  }

  /** API response 전처리 (middleware) */
  private handleResponse<T>(res: AxiosResponse<T>): AxiosResponse<T> {
    this.responseMiddlewares.forEach((middleware) => middleware(res));
    return res;
  }
}
