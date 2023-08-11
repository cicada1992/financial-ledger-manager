'use client';

import {
  Button,
  ButtonProps,
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
  buttonProps?: ButtonProps;
  className?: string;

  onOk?: () => void;
  onCancel?: () => void;
  onClosed?: () => void;
}

const ButtonWithModal: React.FC<IProps> = ({
  label,
  children,
  buttonProps,
  className,
  onOk,
  onCancel,
  onClosed,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button color="default" size="sm" {...buttonProps} onClick={onOpen} className={className}>
        {label}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        placement="center"
        size="xs"
      >
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
    onClosed?.();
  }

  function handleCancelClick() {
    onCancel?.();
    onClose();
    onClosed?.();
  }
};

export default ButtonWithModal;
