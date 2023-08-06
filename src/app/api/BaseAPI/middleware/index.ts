import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import ErrorManager from '@/app/lib/ErrorManager';

import responseMiddleware from './reponseMiddleware';
import { IAPIMiddleware, RequestMiddleware, ResponseMiddleware } from '../types';

export default class WithMiddleware {
  protected readonly instance: AxiosInstance;

  private readonly requestMiddlewares: RequestMiddleware[];

  private readonly responseMiddlewares: ResponseMiddleware[];

  constructor(config: AxiosRequestConfig, middleware: IAPIMiddleware = {}) {
    this.instance = axios.create(config);
    this.requestMiddlewares = middleware.request || [];
    this.responseMiddlewares = [responseMiddleware.auth, ...(middleware.response || [])];

    this.initInterceptors();
  }

  private initInterceptors() {
    const { interceptors } = this.instance;
    interceptors.request.use((config) => this.handleRequest(config));
    interceptors.response.use(
      (res) => this.handleResponse(res),
      (error) => ErrorManager.interceptAxiosError(error),
    );
  }

  /** API request 전처리 (middleware) */
  private async handleRequest(
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    for (let i = 0; i < this.requestMiddlewares.length; i += 1) {
      await this.requestMiddlewares[i](config);
    }
    return config;
  }

  /** API response 전처리 (middleware) */
  private handleResponse<T>(res: AxiosResponse<T>): AxiosResponse<T> {
    this.responseMiddlewares.forEach((middleware) => middleware(res));
    return res;
  }
}
