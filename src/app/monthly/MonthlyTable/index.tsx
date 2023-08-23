'use client';

import {
  Table as NextUITable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  Spacer,
  Button,
  SortDescriptor,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { orderBy } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react';

import { ICreateMonthlyBody, IMonthly } from '@/app/api/MonthlyAPI/types';
import { useMonthlyStore } from '@/app/store/monthlyStore';
import { useUserStore } from '@/app/store/userStore';
import { DateUtils } from '@/app/utils/dateUtils';

import CopyPrevMonthDataButton from './CopyPrevMonthDataButton';
import { doneCell, grandient } from './MonthlyTable.css';
import MonthlyRowCreator from './RowCreator';
import MonthlyRowEditor from './RowEditor';
import MonthlyRowRemover from './RowRemover';
import MonthlyTableTitle from './Title';
import SectionWrapper from '../shared/SectionWrapper';

export const MONTHLY_TABLE_COLUMNS: Array<{ name: string; uid: string }> = [
  { name: '항목', uid: 'name' },
  { name: '금액(￦)', uid: 'amount' },
  { name: '날짜', uid: 'date' },
];

interface IProps {
  title: React.ReactNode;
  rows: Array<IMonthly>;
  type: IMonthly['type'];
}

/* eslint-disable */
const MonthlyTable: React.FC<IProps> = ({ title, rows, type }) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());
  const referenceDate = useUserStore((state) => state.userInfo.referenceDate);
  const monthlyStore = useMonthlyStore();
  const { baseMonth } = DateUtils.getYearAndMonth(monthlyStore.date, referenceDate);
  const noSelectedRow = selectedKeys.size <= 0;
  const selectedRow = getSelectedRow();
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'date',
    direction: 'ascending',
  });
  const [sortedRows, setSortedRows] = useState<IMonthly[]>([]);

  useEffect(() => {
    const sorted = getSortedRows();
    setSortedRows(sorted);
  }, [rows]);

  useEffect(() => {
    const { column, direction } = sortDescriptor;
    if (!column || !direction) return;

    const sorted = getSortedRows();
    setSortedRows(sorted);
  }, [sortDescriptor]);

  const renderCell = useCallback((row: IMonthly, columnKey: keyof IMonthly) => {
    switch (columnKey) {
      case 'name':
        return (
          <div
            style={{
              wordBreak: 'break-all',
              maxWidth: '100%',
              wordWrap: 'break-word',
            }}
          >
            {row.name}
          </div>
        );
      case 'amount':
        return row.amount.toLocaleString();
      case 'date':
        const rowMonth = dayjs(row.date).get('month') + 1;
        const isSameAsBaseMonth = rowMonth === baseMonth;
        const date = dayjs(row.date).format('D일');
        return (
          <div className={row.done ? doneCell : undefined}>
            <span className={row.done ? grandient : undefined}>
              {isSameAsBaseMonth ? '당월' : '익월'} {date}
            </span>
          </div>
        );
      default:
        return '-';
    }
  }, []);

  return (
    <SectionWrapper title={<MonthlyTableTitle title={title} />}>
      <NextUITable
        aria-label="Example static collection table"
        id="NextUITable"
        selectionMode="single"
        color="danger"
        disabledKeys={rows.filter((row) => row.done).map((row) => row.id)}
        onSelectionChange={(keys) => handleSelectChange(keys as Set<string>)}
        sortDescriptor={sortDescriptor}
        onSortChange={(value) => setSortDescriptor(value)}
      >
        <TableHeader columns={MONTHLY_TABLE_COLUMNS}>
          {(column) => {
            const width = (() => {
              if (column.uid === 'name') return '50%';
              if (column.uid === 'date') return 100;
            })();
            return (
              <TableColumn
                key={column.uid}
                width={width}
                minWidth={width}
                maxWidth={width}
                allowsSorting
              >
                {column.name}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody
          items={sortedRows}
          emptyContent={
            <>
              <div className="pb-1">데이터를 추가해주세요.</div>
              <CopyPrevMonthDataButton />
            </>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="text-xs">
                  {renderCell(item, columnKey as keyof IMonthly)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </NextUITable>
      <Spacer y={2} />
      <div className="w-full flex justify-between">
        <div className="flex">
          <MonthlyRowRemover
            type={type}
            onRemove={handleRemoveClick}
            className={noSelectedRow ? 'invisible' : ''}
          />
          <Spacer x={1} />
          <MonthlyRowEditor
            row={selectedRow}
            type={type}
            onEdit={handleEditClick}
            className={noSelectedRow ? 'invisible' : ''}
          />
          <Spacer x={1} />
          <Button
            size="sm"
            color={'default'}
            className={noSelectedRow ? 'invisible' : ''}
            onClick={handleDoneClick}
          >
            {selectedRow?.done ? '완료 취소' : '완료 처리'}
          </Button>
        </div>
        <MonthlyRowCreator type={type} onAdd={handleAddClick} />
      </div>
    </SectionWrapper>
  );

  function handleSelectChange(keys: Set<string>) {
    setSelectedKeys(keys);
  }

  async function handleAddClick(body: ICreateMonthlyBody) {
    monthlyStore.create(body, resetSelectedKeys);
  }

  function handleRemoveClick() {
    monthlyStore.remove(Array.from(selectedKeys), resetSelectedKeys);
  }

  function handleEditClick(row: IMonthly) {
    monthlyStore.update(row, resetSelectedKeys);
  }

  function handleDoneClick() {
    if (!selectedRow) return;
    monthlyStore.update({ ...selectedRow, done: !selectedRow.done }, resetSelectedKeys);
  }

  function getSelectedRow() {
    return rows.find((item) => String(item.id) == Array.from(selectedKeys)[0]);
  }

  function resetSelectedKeys() {
    selectedKeys.clear();
  }

  function getSortedRows() {
    const { column, direction } = sortDescriptor;
    const orders = direction === 'ascending' ? 'asc' : 'desc';
    return orderBy(
      rows,
      (row) => {
        const assertedColumn = column as keyof IMonthly;
        if (assertedColumn === 'name') return row.name;
        if (assertedColumn === 'amount') return row.amount;
        if (assertedColumn === 'date') return Number(dayjs(row.date).format('YYYYMMDD'));
      },
      orders,
    );
  }
};

export default MonthlyTable;
