export interface IMonthly {
  id: string;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
}

export interface ICreateMonthlyBody {
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  user: string;
}
export interface IUpdateMonthlyBody extends IMonthly {}
