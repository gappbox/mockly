import { ReactNode } from 'react';
import HStack from 'rsuite/HStack';
import StackItem from 'rsuite/StackItem';
import FieldsViewActions from './FieldsViewActions';
import FieldsViewHeading from './FieldsViewHeading';
import { Field } from '../../data/models';

type FieldsViewPanelProps = {
  fields: Field[];
  onAddField: () => void;
  onDeleteFields: () => void;
  onOpenTemplates: () => void;
};

const FieldsViewPanel = ({
  fields,
  onAddField,
  onDeleteFields,
  onOpenTemplates,
}: FieldsViewPanelProps): ReactNode => {
  return (
    <HStack spacing={4}>
      <StackItem grow={1}>
        <FieldsViewHeading />
      </StackItem>

      <StackItem alignSelf="flex-start">
        <FieldsViewActions
          fields={fields}
          onAddField={onAddField}
          onDeleteFields={onDeleteFields}
          onOpenTemplates={onOpenTemplates}
        />
      </StackItem>
    </HStack>
  );
};

export default FieldsViewPanel;