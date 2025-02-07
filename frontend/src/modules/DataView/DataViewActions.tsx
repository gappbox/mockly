import { ReactNode } from 'react';
import HStack from 'rsuite/HStack';
import Icon from '@rsuite/icons/Icon';
import IconButton from 'rsuite/IconButton';
import Tooltip from 'rsuite/Tooltip';
import Whisper from 'rsuite/Whisper';
import CopyIcon from '../../components/Icons/Copy';
import DownloadIcon from '../../components/Icons/Download';

type DataViewActionsProps = {
  onCopy: () => void;
  onDownload: () => void;
};

const DataViewActions = ({
  onCopy,
  onDownload,
}: DataViewActionsProps): ReactNode => {
  return (
    <HStack spacing={8}>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Copy to clipboard</Tooltip>}
      >
        <IconButton
          appearance="subtle"
          icon={<Icon as={CopyIcon} />}
          onClick={onCopy}
        />
      </Whisper>

      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Download json</Tooltip>}
      >
        <IconButton
          appearance="subtle"
          icon={<Icon as={DownloadIcon} />}
          onClick={onDownload}
        />
      </Whisper>
    </HStack>
  );
};

export default DataViewActions;