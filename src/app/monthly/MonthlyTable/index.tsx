'use client';

import {
  Table as NextUITable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  Spacer,
  Switch,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';

import { ICreateMonthlyBody, IMonthly } from '@/app/api/MonthlyAPI/types';
import { useMonthlyStore } from '@/app/store/monthlyStore';
import { useUserStore } from '@/app/store/userStore';
import { DateUtils } from '@/app/utils/dateUtils';

import MonthlyRowCreator from './RowCreator';
import MonthlyRowEditor from './RowEditor';
import MonthlyRowRemover from './RowRemover';
import MonthlyTableTitle from './Title';
import SectionWrapper from '../shared/SectionWrapper';

export const MONTHLY_TABLE_COLUMNS: Array<{ name: string; uid: string }> = [
  { name: '항목', uid: 'name' },
  { name: '금액(￦)', uid: 'value' },
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
  const renderCell = useCallback((row: IMonthly, columnKey: React.Key) => {
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
      case 'value':
        return row.amount.toLocaleString();
      case 'date':
        const rowMonth = dayjs(row.date).get('month') + 1;
        const isSameAsBaseMonth = rowMonth === baseMonth;
        const date = dayjs(row.date).format('D일');
        return `${isSameAsBaseMonth ? '당월' : '익월'} ${date}`;
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
    <SectionWrapper title={<MonthlyTableTitle title={title} />}>
      <NextUITable
        aria-label="Example static collection table"
        id="NextUITable"
        selectionMode="single"
        color="danger"
        disabledKeys={rows.filter((row) => row.done).map((row) => row.id)}
        onSelectionChange={(keys) => handleSelectChange(keys as Set<string>)}
      >
        <TableHeader columns={MONTHLY_TABLE_COLUMNS}>
          {(column) => {
            const width = (() => {
              if (column.uid === 'name') return '50%';
              if (column.uid === 'price') return 80;
              if (column.uid === 'date') return 100;
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
              {(columnKey) => (
                <TableCell className="text-xs">{renderCell(item, columnKey)}</TableCell>
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
            className={selectedKeys.size <= 0 ? 'invisible' : ''}
          />
          <Spacer x={1} />
          <MonthlyRowEditor
            row={rows.find((item) => String(item.id) == Array.from(selectedKeys)[0])}
            type={type}
            onEdit={handleEditClick}
            className={selectedKeys.size <= 0 ? 'invisible' : ''}
          />
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

  function handleRowChange<TKey extends keyof IMonthly>(
    key: TKey,
    value: IMonthly[TKey],
    row: IMonthly,
  ) {
    const cloned = structuredClone(row);
    cloned[key] = value;
    monthlyStore.update(cloned, resetSelectedKeys);
  }

  function handleRemoveClick() {
    monthlyStore.remove(Array.from(selectedKeys), resetSelectedKeys);
  }

  function handleEditClick(row: IMonthly) {
    monthlyStore.update(row, resetSelectedKeys);
  }

  function resetSelectedKeys() {
    selectedKeys.clear();
  }
};

export default MonthlyTable;
