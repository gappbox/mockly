import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import 'rsuite/dist/rsuite.min.css';
import './styles/variables.css';
import './styles/main.css';
import './styles/custom.css';
import { createRoot } from 'react-dom/client';
import { CustomProvider } from 'rsuite';
import { NotificationProvider } from './components/Notification';
import NiceModal from '@ebay/nice-modal-react';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <CustomProvider theme="dark">
    <NotificationProvider>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </NotificationProvider>
  </CustomProvider>
);
