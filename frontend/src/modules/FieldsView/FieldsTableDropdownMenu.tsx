import { ReactNode } from 'react';
import DropdownItem from 'rsuite/DropdownItem';
import DropdownMenu from 'rsuite/DropdownMenu';
import Icon from '@rsuite/icons/Icon';
import IconButton from 'rsuite/IconButton';
import MoreIcon from '@rsuite/icons/More';
import Popover from 'rsuite/Popover';
import Whisper from 'rsuite/Whisper';
import DeleteIcon from '../../components/Icons/Delete';
import EditIcon from '../../components/Icons/Edit';
import NorthIcon from '../../components/Icons/North';
import SouthIcon from '../../components/Icons/South';
import { Field } from '../../data/models';

type FieldsTableDropdownMenuProps = {
  field: Field;
  fields: Field[];
  onDeleteField: (field: Field) => void;
  onEditField: (field: Field) => void;
  onMoveFieldUp: (id: string) => void;
  onMoveFieldDown: (id: string) => void;
};

const FieldsTableDropdownMenu = ({
  field,
  fields,
  onDeleteField,
  onEditField,
  onMoveFieldUp,
  onMoveFieldDown,
}: FieldsTableDropdownMenuProps): ReactNode => {
  return (
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
              if (eventKey === 'edit') onEditField(field);
              if (eventKey === 'delete') onDeleteField(field);
              if (eventKey === 'moveUp') onMoveFieldUp(field.id)
              if (eventKey === 'moveDown') onMoveFieldDown(field.id)
              onClose();
            }}
          >
            <DropdownItem
              disabled={fields.findIndex((f) => f.id === field.id) === 0}
              eventKey="moveUp"
              icon={<Icon as={NorthIcon} />}
            >
              Move Up
            </DropdownItem>

            <DropdownItem
              disabled={fields.findIndex((f) => f.id === field.id) === fields.length - 1}
              eventKey="moveDown"
              icon={<Icon as={SouthIcon} />}
            >
              Move Down
            </DropdownItem>

            <DropdownItem
              eventKey="edit"
              icon={<Icon as={EditIcon} />}
            >
              Edit
            </DropdownItem>

            <DropdownItem
              eventKey="delete"
              icon={<Icon as={DeleteIcon} />}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Popover>
      )}
    >
      <IconButton appearance="subtle" icon={<MoreIcon />} />
    </Whisper>
  );
};

export default FieldsTableDropdownMenu;