import { useEffect, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from 'rsuite/Button';
import Loader from 'rsuite/Loader';
import Modal from 'rsuite/Modal';
import ModalBody from 'rsuite/ModalBody';
import ModalFooter from 'rsuite/ModalFooter';
import ModalHeader from 'rsuite/ModalHeader';
import ModalTitle from 'rsuite/ModalTitle';
import SelectPicker from 'rsuite/SelectPicker';
import Text from 'rsuite/Text';
import VStack from 'rsuite/VStack';
import TemplatesTable from './TemplatesTable.tsx';
import { useRootStore } from '../../data/store';

const TemplatesModal = NiceModal.create(() => {
  const [ready, setReady] = useState(false);
  const modal = useModal();
  const setFields =  useRootStore.use.setFields();
  const templates = useRootStore.use.templates();
  const [templateId, setTemplateId] = useState<string>(templates[0].id);
  const template = templates.find(({ id }) => id === templateId) ?? templates[0];

  useEffect(() => {
    setTimeout(() => setReady(true), 500);
  }, []);

  return (
    <Modal
      backdrop="static"
      size="md"
      open={modal.visible}
      onClose={modal.hide}
      onExited={modal.remove}
    >
      <ModalHeader>
        <ModalTitle>Templates</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Text muted style={{ marginBottom: 20 }}>Use templates to quickly apply common field configurations.</Text>

        <VStack alignItems="stretch" spacing={16}>
          <SelectPicker
            cleanable={false}
            data={templates}
            labelKey="name"
            menuMaxHeight={140}
            placeholder="Select template"
            searchable={false}
            style={{ width: 250 }}
            value={templateId}
            valueKey="id"
            onSel ect={(value: string) => setTemplateId(value)}
          />

          {ready
            ? <TemplatesTable fields={template.fields} />
            : <Loader size="sm" content="Loading..." />
          }
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button appearance="subtle" onClick={modal.hide}>
          Cancel
        </Button>
        <Button appearance="primary" onClick={() => {
          setFields(template.fields);
          modal.hide();
        }}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default TemplatesModal;