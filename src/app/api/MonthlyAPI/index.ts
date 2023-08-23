import { YYYYMM } from '@/types';

import { ICreateMonthlyBody, IMonthly, IUpdateMonthlyBody } from './types';
import BaseAPI from '../BaseAPI';

namespace MonthlyAPI {
  const api = new BaseAPI('/monthly');

  export function getList(userEmail: string, date: YYYYMM): Promise<IMonthly[]> {
    return api.get(`/`, { params: { userEmail, date } });
  }

  export function create(body: ICreateMonthlyBody, date: YYYYMM): Promise<IMonthly[]> {
    return api.post('', body, { params: { date } });
  }

  export function update(body: IUpdateMonthlyBody, date: YYYYMM): Promise<IMonthly[]> {
    return api.put(`/${body.id}`, body, { params: { date } });
  }

  export function remove(id: string): Promise<void> {
    return api.delete(`/${id}`);
  }

  export function copy(userEmail: string, date: YYYYMM): Promise<IMonthly[]> {
    return api.get(`/copy`, { params: { userEmail, date } });
  }
}

export default MonthlyAPI;
