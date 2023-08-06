import { selector } from 'recoil';

import MonthlyAPI from '../api/MonthlyAPI';

export namespace Selectors {
  export const monthlyDataQuery = selector({
    key: 'monthlyDataQuery',
    get: async () => {
      const response = await MonthlyAPI.getData();
      return response;
    },
  });
}
