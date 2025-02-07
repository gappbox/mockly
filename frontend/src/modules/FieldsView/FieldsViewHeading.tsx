import { Fragment, ReactNode } from 'react';
import Heading from 'rsuite/Heading';
import Text from 'rsuite/Text';

const FieldsViewHeading = (): ReactNode => {
  return (
    <Fragment>
      <Heading level={4}>Manage Your Fields</Heading>
      <Text muted>Create fields, select their categories, and define their types.</Text>
    </Fragment>
  );
};

export default FieldsViewHeading;