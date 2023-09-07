import { YYYYMMDD } from '@/types';

export interface IAnnually {
  id: string;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  date: YYYYMMDD;
  /** 유저 이메일 */
  userId: string;
}

export interface ICreateAnnuallyBody {
  name: string;
  amount: number;
  done: boolean;
  type: IAnnually['type'];
  date: YYYYMMDD;
  /** 유저 이메일 */
  userId: string;
}

export interface IUpdateAnnuallyBody {
  id: string;
  name: string;
  amount: number;
  done: boolean;
  type: IAnnually['type'];
  date: YYYYMMDD;
  /** 유저 이메일 */
  userId: string;
}
