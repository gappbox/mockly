import { ReactNode } from 'react';
import Panel from 'rsuite/Panel';
import useMediaQuery from 'rsuite/useMediaQuery';
import { useDynamicHeight } from '../../data/hooks';

type DataPreviewProps = {
  json: string;
};

const DataPreview = ({ json }: DataPreviewProps): ReactNode => {
  const {containerRef, height} = useDynamicHeight();
  const [mobile] = useMediaQuery('(max-width: 767px)');

  return (
    <Panel
      className="rs-code"
      bordered
      ref={containerRef}
      style={{ overflow: 'auto', height: mobile ? 'auto' : height, width: '100%' }}
    >
      <pre>{json}</pre>
    </Panel>
  );
};

export default DataPreview;