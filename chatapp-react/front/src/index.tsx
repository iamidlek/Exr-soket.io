import { render } from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

import './index.scss';

render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root'),
);
