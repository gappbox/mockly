import { ReactNode, useEffect, useState } from 'react';
import Panel from 'rsuite/Panel';
import StackItem from 'rsuite/StackItem';
import VStack from 'rsuite/VStack';
import DataPreview from './DataPreview';
import DataPreviewActions from './DataPreviewActions';
import DataViewPanel from './DataViewPanel';
import { createJson } from '../../data/utils/createJson';
import { useClipboard, useDownload, useMockDataGenerator } from '../../data/hooks';
import { useRootStore } from '../../data/store';

const DataView = (): ReactNode => {
  const [selectedCount, setSelectedCount] = useState(100);
  const {download} = useDownload();
  const {writeText} = useClipboard();
  const {data, loading, generateData, clearData} = useMockDataGenerator();
  const json = data ? createJson(data) : '';
  const fields = useRootStore.use.fields();

  useEffect(() => {
    if (fields.length === 0) {
      clearData();
    }
  }, [fields]);

  return (
    <Panel>
      <VStack alignItems="stretch" spacing={20}>
        <StackItem>
          <DataViewPanel onCopy={() => writeText(json)} onDownload={() => json && download(json)} />
        </StackItem>

        <StackItem>
          <DataPreviewActions
            count={selectedCount}
            fields={fields}
            loading={loading}
            onChangeCount={setSelectedCount}
            onGenerateData={generateData}
          />
        </StackItem>

        <StackItem>
          <DataPreview json={json} />
        </StackItem>
      </VStack>
    </Panel>
  );
};

export default DataView;