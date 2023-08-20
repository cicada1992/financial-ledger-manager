export interface IMonthly {
  id: string;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  month: number;
  /** 유저 이메일 */
  userId: string;
}

export interface ICreateMonthlyBody {
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  month: number;
  /** 유저 이메일 */
  userId: string;
}

export interface IUpdateMonthlyBody {
  id: string;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  month: number;
  /** 유저 이메일 */
  userId: string;
}
