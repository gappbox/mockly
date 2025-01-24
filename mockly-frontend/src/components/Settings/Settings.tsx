import { ReactNode } from 'react';
import Dropdown from 'rsuite/Dropdown';
import IconButton from 'rsuite/IconButton';
import MenuIcon from '@rsuite/icons/Menu';
import Popover from 'rsuite/Popover';
import Whisper from 'rsuite/Whisper';

const Settings = (): ReactNode => {
  return (
    <Whisper
      placement="bottomEnd"
      trigger="click"
      speaker={({ className, top, left, onClose }, ref) => (
        <Popover
          className={className}
          full
          ref={ref}
          style={{ left, top }}
        >
          <Dropdown.Menu style={{ width: "200px" }} onSelect={() => onClose()}>
            <Dropdown.Item panel style={{ padding: 10 }}>Theme</Dropdown.Item>
            <Dropdown.Item eventKey="dark">Dark</Dropdown.Item>
            <Dropdown.Item eventKey="light">Light</Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      )}>
      <IconButton appearance="subtle" icon={<MenuIcon />} />
    </Whisper>
  );
};

export default Settings;