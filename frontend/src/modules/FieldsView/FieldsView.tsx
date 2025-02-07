import { ReactNode } from 'react';
import FieldModal from './FieldModal';
import FieldsTable from './FieldsTable';
import FieldsViewPanel from './FieldsViewPanel';
import NiceModal from '@ebay/nice-modal-react';
import Panel from 'rsuite/Panel';
import StackItem from 'rsuite/StackItem';
import TemplatesModal from '../TemplatesView/TemplatesModal.tsx';
import VStack from 'rsuite/VStack';
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
            onDeleteFields={() => removeFields()}
            onOpenTemplates={() => NiceModal.show(TemplatesModal)}
          />
        </StackItem>

        <StackItem>
          <FieldsTable
            fields={fields}
            onDeleteField={(field) => removeField(field)}
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