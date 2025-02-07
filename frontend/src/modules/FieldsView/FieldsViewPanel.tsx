import { ReactNode } from 'react';
import DropdownItem from 'rsuite/DropdownItem';
import DropdownMenu from 'rsuite/DropdownMenu';
import Heading from 'rsuite/Heading';
import HStack from 'rsuite/HStack';
import Icon from '@rsuite/icons/Icon';
import IconButton from 'rsuite/IconButton';
import Popover from 'rsuite/Popover';
import StackItem from 'rsuite/StackItem';
import Text from 'rsuite/Text';
import Tooltip from 'rsuite/Tooltip';
import Whisper from 'rsuite/Whisper';
import DeleteIcon from '../../components/Icons/Delete';
import OptionsIcon from '../../components/Icons/Options';
import PlusIcon from '../../components/Icons/Plus';
import TemplateIcon from '../../components/Icons/Template';
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
        <Heading level={4}>Manage Your Fields</Heading>
        <Text muted>Create fields, select their categories, and define their types.</Text>
      </StackItem>

      <StackItem alignSelf="flex-start">
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
              <Popover
                arrow={false}
                className={className}
                full
                ref={ref}
                style={{ left, top, width: '180px' }}
              >
                <DropdownMenu
                  onSelect={(eventKey) => {
                    if (eventKey === 'templates') onOpenTemplates();
                    if (eventKey === 'delete') onDeleteFields();
                    onClose();
                  }}
                >
                  <DropdownItem
                    eventKey="templates"
                    icon={<Icon as={TemplateIcon} />}
                  >
                    Templates
                  </DropdownItem>

                  <DropdownItem
                    disabled={fields.length === 0}
                    eventKey="delete"
                    icon={<Icon as={DeleteIcon} />}
                  >
                    Delete fields
                  </DropdownItem>
                </DropdownMenu>
              </Popover>
            )}
          >
            <IconButton
              appearance="subtle"
              icon={<Icon as={OptionsIcon} />}
              onClick={() => {}}
            />
          </Whisper>
        </HStack>
      </StackItem>
    </HStack>
  );
};

export default FieldsViewPanel;