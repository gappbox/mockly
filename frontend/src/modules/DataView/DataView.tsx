import { ReactNode, useEffect, useState } from 'react';
import Button from 'rsuite/Button';
import HStack from 'rsuite/HStack';
import Panel from 'rsuite/Panel';
import SelectPicker from 'rsuite/SelectPicker';
import StackItem from 'rsuite/StackItem';
import VStack from 'rsuite/VStack';
import DataViewPanel from './DataViewPanel';
import useMediaQuery from 'rsuite/useMediaQuery';
import { useClipboard, useDownload, useDynamicHeight, useMockDataGenerator } from '../../data/hooks';
import { useRootStore } from '../../data/store';
import { createCounts } from '../../data/utils/createCounts';
import { createJson } from '../../data/utils/createJson';

const DataView = (): ReactNode => {
  const {containerRef, height} = useDynamicHeight();
  const [mobile] = useMediaQuery('(max-width: 767px)');
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
          <DataViewPanel
            onCopy={() => writeText(json)}
            onDownload={() => json && download(json)}
          />
        </StackItem>

        <StackItem>
          <HStack spacing={16}>
            <Button
              appearance="primary"
              loading={loading}
              onClick={() => fields.length && generateData(fields, selectedCount)}
            >
              Generate
            </Button>

            <SelectPicker
              cleanable={false}
              data={createCounts()}
              label="Count"
              menuMaxHeight={140}
              searchable={false}
              style={{ width: 'auto' }}
              value={selectedCount}
              onChange={(value) => setSelectedCount(value!)}
            />
          </HStack>
        </StackItem>

        <StackItem>
          <Panel
            className="rs-code"
            bordered
            ref={containerRef}
            style={{ overflow: 'auto', height: mobile ? 'auto' : height, width: '100%' }}
          >
            <pre>{data ? json : ''}</pre>
          </Panel>
        </StackItem>
      </VStack>
    </Panel>
  );
};

export default DataView;