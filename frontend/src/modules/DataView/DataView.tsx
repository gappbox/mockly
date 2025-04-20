import { ReactNode, useEffect, useState } from 'react';
import Panel from 'rsuite/Panel';
import StackItem from 'rsuite/StackItem';
import VStack from 'rsuite/VStack';
import DataPreview from './DataPreview';
import DataPreviewActions from './DataPreviewActions';
import DataViewPanel from './DataViewPanel';
import { createJson } from '../../data/utils/createJson';
import { useClipboard, useDownload, useMockDataGenerator, useNotification } from '../../data/hooks';
import { useRootStore } from '../../data/store';
import { Field } from '../../data/models';

const DataView = (): ReactNode => {
  const [selectedCount, setSelectedCount] = useState(100);
  const {download} = useDownload();
  const {writeText} = useClipboard();
  const {data, loading, generateData, clearData} = useMockDataGenerator();
  const notify = useNotification();
  const json = data ? createJson(data) : '';
  const fields = useRootStore.use.fields();

  const downloadJson = (): void => {
    if (!json) {
      notify.error('No data to download. Please generate data first');
      return;
    }

    download(json);
  };

  const copyJson = async (): Promise<void> => {
    if (!json) {
      notify.error('No data to copy. Please generate data first');
      return;
    }

    await writeText(json);
  }

  const generateJson = (fields: Field[], count: number): void => {
    if (!fields.length) {
      notify.error('No fields defined. Please create at least one field first');
      return;
    }

    generateData(fields, count);
  };

  useEffect(() => {
    if (!fields.length) {
      clearData();
    }
  }, [fields]);

  return (
    <Panel>
      <VStack alignItems="stretch" spacing={20}>
        <StackItem>
          <DataViewPanel
            onCopy={copyJson}
            onDownload={downloadJson}
          />
        </StackItem>

        <StackItem>
          <DataPreviewActions
            count={selectedCount}
            fields={fields}
            loading={loading}
            onChangeCount={setSelectedCount}
            onGenerateData={generateJson}
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