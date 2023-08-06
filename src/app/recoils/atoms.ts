import { atom } from 'recoil';

export namespace Atoms {
  export const monthlyDataState = atom({
    key: 'monthlyDataState',
    default: [{ spend: [], income: [] }],
  });
}
