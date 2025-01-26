import { ReactNode } from 'react';
import HStack from 'rsuite/HStack';
import StorageIcon from '@rsuite/icons/Storage';
import Text from 'rsuite/Text';

const Logo = (): ReactNode => {
  return (
    <HStack spacing={16}>
      <StorageIcon className="rs-logo-svg" style={{ fontSize: '1.125rem' }} />
      <Text
        as="span"
        className="rs-logo"
        size="lg"
        style={{ letterSpacing: '0.3em' }}
        transform="uppercase"
        weight="semibold"
      >
        Mockly
      </Text>
    </HStack>
  );
};

export default Logo;