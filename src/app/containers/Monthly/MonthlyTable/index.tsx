'use client';

import {
  Table as NextUITable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Switch,
  TableCell,
} from '@nextui-org/react';
import React, { useCallback } from 'react';

import { ICreateMonthlyBody, IMonthly, IUpdateMonthlyBody } from '@/app/api/MonthlyAPI/types';

import MonthlyTableTitle from './Title';
import { MONTHLY_TABLE_COLUMNS } from '../constants';
import SectionWrapper from '../shared/SectionWrapper';

interface IProps {
  title: React.ReactNode;
  rows: Array<IMonthly>;
  type: 'INCOME' | 'SPEND';
  createData: (data: ICreateMonthlyBody) => void;
  updateData: (data: IUpdateMonthlyBody) => void;
}

const MonthlyTable: React.FC<IProps> = ({ title, rows, type, createData, updateData }) => {
  const renderCell = useCallback((row: IMonthly, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return row.name;
      case 'value':
        return row.amount.toLocaleString();
      case 'done':
        return (
          <Switch
            isSelected={row.done}
            onValueChange={(value) => handleRowChange('done', value, row)}
          />
        );
      default:
        return '-';
    }
  }, []);

  return (
    <SectionWrapper title={<MonthlyTableTitle title={title} type={type} onAdd={handleAddClick} />}>
      <NextUITable
        aria-label="Example static collection table"
        id="NextUITable"
        disabledKeys={rows.filter((row) => row.done).map((row) => row.id)}
      >
        <TableHeader columns={MONTHLY_TABLE_COLUMNS}>
          {(column) => {
            const width = (() => {
              if (column.uid === 'name') return '45%';
              if (column.uid === 'price') return 100;
              if (column.uid === 'done') return 80;
            })();
            return (
              <TableColumn key={column.uid} width={width} minWidth={width} maxWidth={width}>
                {column.name}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody items={rows} emptyContent={'데이터를 추가해주세요.'}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </NextUITable>
    </SectionWrapper>
  );

  async function handleAddClick(body: ICreateMonthlyBody) {
    createData(body);
  }

  async function handleRowChange<TKey extends keyof IUpdateMonthlyBody>(
    key: TKey,
    value: IUpdateMonthlyBody[TKey],
    row: IMonthly,
  ) {
    const cloned = structuredClone(row);
    cloned[key] = value;
    updateData(cloned);
  }
};

export default MonthlyTable;
