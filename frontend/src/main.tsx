import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import 'rsuite/dist/rsuite.min.css';
import './styles/variables.css';
import './styles/main.css';
import './styles/custom.css';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('No found root element');
}

createRoot(root).render(<App />);
