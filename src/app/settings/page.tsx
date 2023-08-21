'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import { useUserStore } from '@/app/store/userStore';

import PasswordField from '../components/fields/Password';
import ReferenceDateField from '../components/fields/ReferenceDate';
import PageContainer from '../components/PageContainer';

const SettingsPage: React.FC = () => {
  const userStore = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const [referenceDate, setReferenceDate] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setReferenceDate(String(userStore.userInfo.referenceDate));
  }, [userStore.userInfo.referenceDate]);

  return (
    <PageContainer>
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <h4 className="font-bold text-large">Settings</h4>
        </CardHeader>
        <CardBody>
          {editMode ? (
            <div>
              <ReferenceDateField value={referenceDate} onChange={setReferenceDate} />
              <Spacer y={2} />
              <PasswordField value={password} onChange={setPassword} />
            </div>
          ) : (
            // eslint-disable-next-line react/jsx-no-undef
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>기준일</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>{referenceDate}일</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardBody>
        <CardFooter className="flex justify-end">
          {editMode ? (
            <div className="flex">
              <Button color="danger" onClick={() => setEditMode(false)}>
                취소
              </Button>
              <Spacer x={2} />
              <Button color="primary" onClick={handleSubmit}>
                제출
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)}>수정</Button>
          )}
        </CardFooter>
      </Card>
    </PageContainer>
  );

  async function handleSubmit() {
    await userStore.update({ referenceDate: Number(referenceDate), password });
  }
};
export default SettingsPage;
