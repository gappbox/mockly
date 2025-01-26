import { ReactNode } from 'react';
import Heading from 'rsuite/Heading';
import HStack from 'rsuite/HStack';
import Icon from '@rsuite/icons/Icon';
import IconButton from 'rsuite/IconButton';
import StackItem from 'rsuite/StackItem';
import Text from 'rsuite/Text';
import Tooltip from 'rsuite/Tooltip';
import Whisper from 'rsuite/Whisper';
import CopyIcon from '../../components/Icons/Copy';
import DownloadIcon from '../../components/Icons/Download';

type DataViewPanelProps = {
  onCopy: () => void;
  onDownload: () => void;
};

const DataViewPanel = ({
  onCopy,
  onDownload,
}: DataViewPanelProps): ReactNode => {
  return (
    <HStack spacing={4}>
      <StackItem grow={1}>
        <Heading level={4}>Preview Your Data</Heading>
        <Text muted>View the output data based on your selected field settings</Text>
      </StackItem>

      <StackItem alignSelf="flex-start">
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
      </StackItem>
    </HStack>
  );
};

export default DataViewPanel;