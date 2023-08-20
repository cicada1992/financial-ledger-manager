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
import React, { useCallback } from 'react';

import { ICreateMonthlyBody, IMonthly } from '@/app/api/MonthlyAPI/types';
import { useMonthlyStore } from '@/app/store/monthlyStore';

import MonthlyRowCreator from './RowCreator';
import MonthlyRowRemover from './RowRemover';
import MonthlyTableTitle from './Title';
import { MONTHLY_TABLE_COLUMNS } from '../constants';
import SectionWrapper from '../shared/SectionWrapper';

interface IProps {
  title: React.ReactNode;
  rows: Array<IMonthly>;
  type: 'INCOME' | 'SPEND';
}

/* eslint-disable */
const MonthlyTable: React.FC<IProps> = (props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());
  const monthlyStore = useMonthlyStore();

  const { title, rows, type } = props;
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
        selectionMode="multiple"
        color="danger"
        disabledKeys={rows.filter((row) => row.done).map((row) => row.id)}
        onSelectionChange={(keys) => handleSelectChange(keys as Set<string>)}
      >
        <TableHeader columns={MONTHLY_TABLE_COLUMNS}>
          {(column) => {
            const width = (() => {
              if (column.uid === 'name') return '35%';
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
      <Spacer y={2} />
      <div className="w-full flex justify-between">
        <MonthlyRowRemover
          type={type}
          onRemove={handleRemoveClick}
          className={selectedKeys.size <= 0 ? 'invisible' : ''}
        />
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

  function resetSelectedKeys() {
    selectedKeys.clear();
  }
};

export default MonthlyTable;
