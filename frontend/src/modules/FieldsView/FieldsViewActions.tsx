import { ReactNode } from 'react';
import HStack from 'rsuite/HStack';
import Icon from '@rsuite/icons/Icon';
import IconButton from 'rsuite/IconButton';
import Tooltip from 'rsuite/Tooltip';
import Whisper from 'rsuite/Whisper';
import OptionsIcon from '../../components/Icons/Options';
import PlusIcon from '../../components/Icons/Plus';
import FieldsViewDropdownMenu from './FieldsViewDropdownMenu';
import { Field } from '../../data/models';

type FieldsViewActionsProps = {
  fields: Field[];
  onAddField: () => void;
  onDeleteFields: () => void;
  onOpenTemplates: () => void;
};

const FieldsViewActions = ({
  fields,
  onAddField,
  onDeleteFields,
  onOpenTemplates,
}: FieldsViewActionsProps): ReactNode => {
  return (
    <HStack spacing={8}>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Add new field</Tooltip>}
      >
        <IconButton
          appearance="subtle"
          icon={<Icon as={PlusIcon} />}
          onClick={onAddField}
        />
      </Whisper>

      <Whisper
        placement="autoVerticalEnd"
        trigger="click"
        speaker={({ className, left, top, onClose }, ref) => (
          <FieldsViewDropdownMenu
            className={className}
            fields={fields}
            left={left}
            ref={ref}
            top={top}
            onClose={onClose}
            onOpenTemplates={onOpenTemplates}
            onDeleteFields={onDeleteFields}
          />
        )}
      >
        <IconButton appearance="subtle" icon={<Icon as={OptionsIcon} />} />
      </Whisper>
    </HStack>
  );
};

export default FieldsViewActions;