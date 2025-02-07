import { Fragment, ReactNode } from 'react';
import Heading from 'rsuite/Heading';
import Text from 'rsuite/Text';

const DataViewHeading = (): ReactNode => {
  return (
    <Fragment>
      <Heading level={4}>Preview Your Data</Heading>
      <Text muted>View the output data based on your selected field settings</Text>
    </Fragment>
  );
};

export default DataViewHeading;