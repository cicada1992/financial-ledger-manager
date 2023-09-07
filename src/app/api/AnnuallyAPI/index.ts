import { ICreateAnnuallyBody, IAnnually, IUpdateAnnuallyBody } from './types';
import BaseAPI from '../BaseAPI';

namespace AnnuallyAPI {
  const api = new BaseAPI('/annually');

  export function getList(userEmail: string, year: number): Promise<IAnnually[]> {
    return api.get(`/`, { params: { userEmail, year } });
  }

  export function create(body: ICreateAnnuallyBody, year: number): Promise<IAnnually[]> {
    return api.post('', body, { params: { year } });
  }

  export function update(body: IUpdateAnnuallyBody, year: number): Promise<IAnnually[]> {
    return api.put(`/${body.id}`, body, { params: { year } });
  }

  export function remove(id: string): Promise<void> {
    return api.delete(`/${id}`);
  }

  export function copy(userEmail: string, year: number): Promise<IAnnually[]> {
    return api.get(`/copy`, { params: { userEmail, year } });
  }
}

export default AnnuallyAPI;
