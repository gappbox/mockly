import { ReactNode } from 'react';
import Container from 'rsuite/Container';
import Content from 'rsuite/Content';
import Header from 'rsuite/Header';
import HStack from 'rsuite/HStack';
import DataView from './modules/DataView';
import FieldsView from './modules/FieldsView';
import Logo from './components/Logo';
import { useBlurOnClick, useSplashScreen } from './data/hooks';

const App = (): ReactNode => {
  useSplashScreen();
  useBlurOnClick();

  return (
    <Container>
      <Header>
        <HStack justifyContent="space-between" style={{ height: '56px', paddingInline: '20px' }}>
          <Logo />
        </HStack>
      </Header>
      <Content>
        <FieldsView />
        <DataView />
      </Content>
    </Container>
  );
};

export default App;
