import { ReactNode } from 'react';
import HStack from 'rsuite/HStack';
import StackItem from 'rsuite/StackItem';
import DataViewActions from './DataViewActions';
import DataViewHeading from './DataViewHeading';

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
        <DataViewHeading />
      </StackItem>

      <StackItem alignSelf="flex-start">
        <DataViewActions onCopy={onCopy} onDownload={onDownload} />
      </StackItem>
    </HStack>
  );
};

export default DataViewPanel;