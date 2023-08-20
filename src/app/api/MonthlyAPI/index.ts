import { ICreateMonthlyBody, IMonthly, IUpdateMonthlyBody } from './types';
import BaseAPI from '../BaseAPI';

namespace MonthlyAPI {
  const api = new BaseAPI('/monthly');

  export function getList(userEmail: string, month: number): Promise<IMonthly[]> {
    return api.get(`/`, { params: { userEmail, month } });
  }

  export function create(body: ICreateMonthlyBody): Promise<IMonthly[]> {
    return api.post('', body);
  }

  export function update(body: IUpdateMonthlyBody): Promise<IMonthly[]> {
    return api.put(`/${body.id}`, body);
  }

  export function remove(id: string): Promise<IMonthly[]> {
    return api.delete(`/${id}`);
  }
}

export default MonthlyAPI;
