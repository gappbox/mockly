import { ReactNode } from 'react';
import { CustomProvider } from 'rsuite';
import { NotificationProvider } from './components/Notification';
import NiceModal from '@ebay/nice-modal-react';
import Container from 'rsuite/Container';
import Content from 'rsuite/Content';
import Header from 'rsuite/Header';
import HStack from 'rsuite/HStack';
import Icon from '@rsuite/icons/Icon';
import IconButton from 'rsuite/IconButton';
import DarkMode from './components/Icons/DarkMode';
import DataView from './modules/DataView';
import FieldsView from './modules/FieldsView';
import LightMode from './components/Icons/LightMode';
import Logo from './components/Logo';
import { useBlurOnClick, useLocalStorage, useSplashScreen } from './data/hooks';

const App = (): ReactNode => {
  const [theme, setTheme] = useLocalStorage('Mockly.Theme', 'dark');

  useSplashScreen();
  useBlurOnClick();

  return (
    <CustomProvider theme={theme}>
      <NotificationProvider>
        <NiceModal.Provider>
          <Container>
            <Header>
              <HStack
                justifyContent="space-between"
                style={{ height: '56px', paddingInline: '20px' }}
              >
                <Logo />
                <IconButton
                  appearance="subtle"
                  icon={<Icon as={theme === 'dark' ? DarkMode : LightMode} />}
                  onClick={() => setTheme((prevState: string) => prevState === 'light' ? 'dark' : 'light')}
                />
              </HStack>
            </Header>
            <Content>
              <FieldsView />
              <DataView />
            </Content>
          </Container>
        </NiceModal.Provider>
      </NotificationProvider>
    </CustomProvider>
  );
};

export default App;
