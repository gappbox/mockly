import { ReactNode } from 'react';
import Button from 'rsuite/Button';
import HStack from 'rsuite/HStack';
import SelectPicker from 'rsuite/SelectPicker';
import { createCounts } from '../../data/utils/createCounts';
import { Field } from '../../data/models';

type DataPreviewActionsProps = {
  count: number;
  fields: Field[];
  loading: boolean;
  onChangeCount: (count: number) => void;
  onGenerateData: (fields: Field[], count: number) => void
};

const DataPreviewActions = ({
  count,
  fields,
  loading,
  onChangeCount,
  onGenerateData,
}: DataPreviewActionsProps): ReactNode => {
  return (
    <HStack spacing={16}>
      <Button
        appearance="primary"
        loading={loading}
        onClick={() => fields.length && onGenerateData(fields, count)}
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
        value={count}
        onChange={(value) => onChangeCount(value!)}
      />
    </HStack>
  );
};

export default DataPreviewActions;