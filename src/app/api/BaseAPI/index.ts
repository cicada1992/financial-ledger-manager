import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import WithMiddleware from './middleware';

class EdgeAPI extends WithMiddleware {
  private readonly prefix: string;

  constructor(prefix: string) {
    const config: AxiosRequestConfig = {
      paramsSerializer: (params) => qs.stringify(params),
      timeout: 15000,
      timeoutErrorMessage: '[타임아웃] 요청 시간이 지났습니다.',
      baseURL: 'http://localhost:8912', // 'http://3.35.9.92:8912',
    };
    super(config);

    this.prefix = prefix;
  }

  /**
   * @param url prefix를 제외한 url
   * @param config axios request config
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const result = await this.instance.get<T>(this.generateURL(url), config);
    return result.data;
  }

  /**
   * @param url prefix를 제외한 url
   * @param data body 값
   * @param config axios request config
   */
  async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const result = await this.instance.post<T>(this.generateURL(url), body, config);
    return result.data;
  }

  /**
   * @param url prefix를 제외한 url
   * @param data body 값
   * @param config axios request config
   */
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const result = await this.instance.put<T>(this.generateURL(url), data, config);
    return result.data;
  }

  /**
   * @param url prefix를 제외한 url
   * @param config axios request config
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const result = await this.instance.delete<T>(this.generateURL(url), config);
    return result.data;
  }

  private generateURL(url: string) {
    const sanitizedPrefix = this.sanitizeURL(this.prefix);
    const sanitizedURL = this.sanitizeURL(url);

    return `${sanitizedPrefix}${sanitizedURL}`;
  }

  private sanitizeURL(target: string) {
    if (!target) return '';
    return target.startsWith('/') ? target : `/${target}`;
  }
}

export default EdgeAPI;
