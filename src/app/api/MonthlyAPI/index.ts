import { IGetMonthlyDataResponse } from './types';
import BaseAPI from '../BaseAPI';

namespace MonthlyAPI {
  const api = new BaseAPI('/monthly');
  export function getData(): Promise<IGetMonthlyDataResponse> {
    return api.get('');
  }
}

export default MonthlyAPI;
