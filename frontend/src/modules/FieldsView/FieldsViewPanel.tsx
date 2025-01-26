import { ReactNode } from 'react';
import Heading from 'rsuite/Heading';
import HStack from 'rsuite/HStack';
import Icon from '@rsuite/icons/Icon';
import IconButton from 'rsuite/IconButton';
import StackItem from 'rsuite/StackItem';
import Text from 'rsuite/Text';
import Tooltip from 'rsuite/Tooltip';
import Whisper from 'rsuite/Whisper';
import PlusIcon from '../../components/Icons/Plus';

type FieldsViewPanelProps = {
  onAddField: () => void;
};

const FieldsViewPanel = ({ onAddField }: FieldsViewPanelProps): ReactNode => {
  return (
    <HStack spacing={4}>
      <StackItem grow={1}>
        <Heading level={4}>Manage Your Fields</Heading>
        <Text muted>Create fields, select their categories, and define their types.</Text>
      </StackItem>

      <StackItem alignSelf="flex-start">
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
      </StackItem>
    </HStack>
  );
};

export default FieldsViewPanel;