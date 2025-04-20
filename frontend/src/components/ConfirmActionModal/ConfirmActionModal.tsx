import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from 'rsuite/Button';
import Modal from 'rsuite/Modal';
import ModalBody from 'rsuite/ModalBody';
import ModalFooter from 'rsuite/ModalFooter';
import ModalHeader from 'rsuite/ModalHeader';
import ModalTitle from 'rsuite/ModalTitle';
import Text from 'rsuite/Text';

type ConfirmActionModalProps = {
  message: string;
  confirm: () => void;
}

const ConfirmActionModal = NiceModal.create(({ confirm, message }: ConfirmActionModalProps) => {
  const modal = useModal();

  return (
    <Modal
      backdrop="static"
      size="xs"
      open={modal.visible}
      onClose={modal.hide}
      onExited={modal.remove}
    >
      <ModalHeader>
        <ModalTitle>Confirm Action</ModalTitle>

        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>

        <ModalFooter>
          <Button appearance="subtle" onClick={modal.hide}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={() => {
            modal.hide();
            confirm();
          }}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalHeader>
    </Modal>
  );
});

export default ConfirmActionModal;