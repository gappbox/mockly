import { ReactNode } from 'react';
import DropdownItem from 'rsuite/DropdownItem';
import DropdownMenu from 'rsuite/DropdownMenu';
import Icon from '@rsuite/icons/Icon';
import Popover from 'rsuite/Popover';
import DeleteIcon from '../../components/Icons/Delete';
import TemplateIcon from '../../components/Icons/Template';
import { Field } from '../../data/models';

type FieldsViewDropdownMenuProps = {
  className: string;
  fields: Field[];
  left: number | undefined;
  ref: (instance: HTMLElement | null) => void;
  top: number | undefined;
  onClose: () => void;
  onOpenTemplates: () => void;
  onDeleteFields: () => void;
};

const FieldsViewDropdownMenu = ({
  className,
  fields,
  left,
  ref,
  top,
  onClose,
  onOpenTemplates,
  onDeleteFields,
}: FieldsViewDropdownMenuProps): ReactNode => {
  return (
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
  );
};

export default FieldsViewDropdownMenu;