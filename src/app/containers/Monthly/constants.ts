import { TableHeaderProps } from '@nextui-org/react';

export const MONTHLY_TABLE_COLUMNS: TableHeaderProps<{ key: string; label: string }>['columns'] = [
  {
    key: 'name',
    label: '항목',
  },
  {
    key: 'price',
    label: '금액(￦)',
  },
  {
    key: 'done',
    label: '완료',
  },
];

export const INCOME_ROWS: Array<{
  key: string;
  name: string;
  price: number;
  done: boolean;
}> = [
  {
    key: '1',
    name: '월급',
    price: 6000000,
    done: true,
  },
  {
    key: '2',
    name: '유빈이 부모님',
    price: 500000,
    done: true,
  },
];

export const SPEND_ROWS: Array<{
  key: string;
  name: string;
  price: number;
  done: boolean;
}> = [
  {
    key: '1',
    name: '유빈 휴대폰비',
    price: 19700,
    done: true,
  },
  {
    key: '2',
    name: '영재 휴대폰비',
    price: 9700,
    done: false,
  },
  {
    key: '3',
    name: 'DB 보험',
    price: 130000,
    done: true,
  },
  {
    key: '4',
    name: '주담대(카카오)',
    price: 1600000,
    done: true,
  },
];
