import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import React from 'react';

import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store'
import { Toaster } from 'sonner';
// import { Toaster } from './components/ui/toaster';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>

      <App />
      <Toaster/>
      </Provider>
  </StrictMode>,
)


;

