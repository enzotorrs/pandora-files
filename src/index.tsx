import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './pages/Home';
import './index.scss'
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Home></Home>
    </SnackbarProvider>
  </React.StrictMode>
);
