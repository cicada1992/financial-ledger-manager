import { AxiosResponse } from 'axios';

export type ResponseMiddleware<T = unknown> = (res: AxiosResponse<T>) => void;
