export interface IMonthlyDataRow {
  id: string;
  name: string;
  value: number;
  done: boolean;
}

export interface IGetMonthlyDataResponse {
  spend: Array<IMonthlyDataRow>;
  income: Array<IMonthlyDataRow>;
}
