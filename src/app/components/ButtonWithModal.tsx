'use client';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalProps,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';

interface IProps {
  label: string;
  /** 헤더, 바디만 */
  children: ModalProps['children'];
  onOk?: () => void;
  onCancel?: () => void;
}

const ButtonWithModal: React.FC<IProps> = ({ label, children, onOk, onCancel }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" onPress={onOpen}>
        {label}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton placement="center">
        <ModalContent>
          {children}
          <ModalFooter>
            <Button onClick={handleCancelClick}>닫기</Button>
            <Button color="primary" onPress={handleOkClick}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  function handleOkClick() {
    onOk?.();
    onClose();
  }

  function handleCancelClick() {
    onCancel?.();
    onClose();
  }
};

export default ButtonWithModal;
