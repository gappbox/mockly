import { ReactNode } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import Panel from 'rsuite/Panel';
import StackItem from 'rsuite/StackItem';
import VStack from 'rsuite/VStack';
import FieldModal from './FieldModal';
import FieldsTable from './FieldsTable';
import FieldsViewPanel from './FieldsViewPanel';
import { useRootStore } from '../../data/store';
import { Field } from '../../data/models';

const FieldsView = (): ReactNode => {
  const fields = useRootStore.use.fields();
  const removeField = useRootStore.use.removeField();
  const moveFieldUp = useRootStore.use.moveFieldUp();
  const moveFieldDown = useRootStore.use.moveFieldDown();

  const openFieldModal = (field?: Field): void => {
    NiceModal.show(FieldModal, { field: field ?? null });
  };

  const deleteField = (field: Field): void => {
    removeField(field);
  };

  return (
    <Panel>
      <VStack alignItems="stretch" spacing={40}>
        <StackItem>
          <FieldsViewPanel onAddField={() => openFieldModal()} />
        </StackItem>

        <StackItem>
          <FieldsTable
            fields={fields}
            onDeleteField={(field) => deleteField(field)}
            onEditField={(field) => openFieldModal(field)}
            onMoveFieldUp={(id) => moveFieldUp(id)}
            onMoveFieldDown={(id) => moveFieldDown(id)}
          />
        </StackItem>
      </VStack>
    </Panel>
  );
};

export default FieldsView;