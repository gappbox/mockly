import { ReactNode } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import Panel from 'rsuite/Panel';
import StackItem from 'rsuite/StackItem';
import VStack from 'rsuite/VStack';
import ConfirmActionModal from '../../components/ConfirmActionModal';
import FieldModal from './FieldModal';
import FieldsTable from './FieldsTable';
import FieldsViewPanel from './FieldsViewPanel';
import TemplatesModal from '../TemplatesView/TemplatesModal';
import { useRootStore } from '../../data/store';

const FieldsView = (): ReactNode => {
  const fields = useRootStore.use.fields();
  const removeField = useRootStore.use.removeField();
  const removeFields = useRootStore.use.removeFields();
  const moveFieldUp = useRootStore.use.moveFieldUp();
  const moveFieldDown = useRootStore.use.moveFieldDown();

  return (
    <Panel>
      <VStack alignItems="stretch" spacing={40}>
        <StackItem>
          <FieldsViewPanel
            fields={fields}
            onAddField={() => NiceModal.show(FieldModal, { field: null })}
            onDeleteFields={() => NiceModal.show(ConfirmActionModal, {
              message: 'Are you sure you want to delete all fields? This action cannot be undone.',
              confirm: () => removeFields()
            })}
            onOpenTemplates={() => NiceModal.show(TemplatesModal)}
          />
        </StackItem>

        <StackItem>
          <FieldsTable
            fields={fields}
            onDeleteField={(field) => NiceModal.show(ConfirmActionModal, {
              message: 'Are you sure you want to delete this field? This action cannot be undone.',
              confirm: () => removeField(field)
            })}
            onEditField={(field) => NiceModal.show(FieldModal, { field: field })}
            onMoveFieldUp={(id) => moveFieldUp(id)}
            onMoveFieldDown={(id) => moveFieldDown(id)}
          />
        </StackItem>
      </VStack>
    </Panel>
  );
};

export default FieldsView;