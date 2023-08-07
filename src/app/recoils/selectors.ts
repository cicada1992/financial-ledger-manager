import { selector } from 'recoil';

import { IGetMonthlyDataResponse } from '../api/MonthlyAPI/types';

export namespace Selectors {
  export const monthlyDataQuery = selector({
    key: 'monthlyDataQuery',
    get: async () => {
      // const response = await MonthlyAPI.getData();
      return { spend: [], income: [] } as IGetMonthlyDataResponse;
    },
  });
}
