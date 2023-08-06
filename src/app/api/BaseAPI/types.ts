import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestMiddleware = (config: AxiosRequestConfig) => Promise<void>;
export type ResponseMiddleware<T = unknown> = (res: AxiosResponse<T>) => void;

export interface IAPIMiddleware<T = unknown> {
  request?: RequestMiddleware[];
  response?: ResponseMiddleware<T>[];
}
