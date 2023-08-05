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

import { MONTHLY_TABLE_COLUMNS } from './constants';
import SectionWrapper from './shared/SectionWrapper';

export interface IRow {
  id: string;
  name: string;
  value: number;
  done: boolean;
}

interface IProps {
  title: React.ReactNode;
  rows: Array<IRow>;
}

const MonthlyTable: React.FC<IProps> = ({ title, rows }) => {
  const renderCell = useCallback((row: IRow, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return row.name;
      case 'value':
        return row.value.toLocaleString();
      case 'done':
        return <Switch isSelected={row.done} />;
      default:
        return '-';
    }
  }, []);

  return (
    <SectionWrapper title={title}>
      <NextUITable aria-label="Example static collection table" id="NextUITable">
        <TableHeader columns={MONTHLY_TABLE_COLUMNS}>
          {(column) => {
            const width = column.uid === 'name' ? '65%' : '100%';
            return (
              <TableColumn key={column.uid} width={width} minWidth={width} maxWidth={width}>
                {column.name}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody items={rows}>
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
