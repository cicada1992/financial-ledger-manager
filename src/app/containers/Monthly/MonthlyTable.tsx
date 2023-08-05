'use client';

import {
  Table as NextUITable,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  getKeyValue,
  Switch,
  TableBodyProps,
} from '@nextui-org/react';
import React from 'react';

import { MONTHLY_TABLE_COLUMNS } from './constants';

interface IProps {
  rows: TableBodyProps<{
    key: string;
    name: string;
    price: number;
    done: boolean;
  }>['items'];
}

const MonthlyTable: React.FC<IProps> = ({ rows }) => {
  return (
    <NextUITable aria-label="Example static collection table" id="NextUITable">
      <TableHeader columns={MONTHLY_TABLE_COLUMNS}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              const value = getKeyValue(item, columnKey);
              if (typeof value === 'boolean') {
                return <TableCell>{<Switch isSelected={value} />}</TableCell>;
              }
              if (typeof value === 'number') {
                return <TableCell>{`${value.toLocaleString()}`}</TableCell>;
              }
              return <TableCell>{value}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </NextUITable>
  );
};

export default MonthlyTable;
