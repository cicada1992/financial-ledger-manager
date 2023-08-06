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

import { IMonthlyDataRow } from '@/app/api/MonthlyAPI/types';

import { MONTHLY_TABLE_COLUMNS } from './constants';
import SectionWrapper from './shared/SectionWrapper';

interface IProps {
  title: React.ReactNode;
  rows: Array<IMonthlyDataRow>;
}

const MonthlyTable: React.FC<IProps> = ({ title, rows }) => {
  const renderCell = useCallback((row: IMonthlyDataRow, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return row.name;
      case 'value':
        return row.value.toLocaleString();
      case 'done':
        return (
          <Switch
            isSelected={row.done}
            onValueChange={(value) => {
              console.log(value);
            }}
          />
        );
      default:
        return '-';
    }
  }, []);

  return (
    <SectionWrapper
      title={
        <div className="flex justify-between items-end">
          <div>{title}</div>
          {/* <Button
            radius="full"
            className="bg-gradient-to-tr from-blue-500 to-green-500 text-white shadow-lg"
            size="sm"
          >
            Edit
          </Button> */}
        </div>
      }
    >
      <NextUITable aria-label="Example static collection table" id="NextUITable">
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
};

export default MonthlyTable;
