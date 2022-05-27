import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MarkerAndMapContextProvider } from './context/MarkerAndMapContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MarkerAndMapContextProvider>
      <App />
    </MarkerAndMapContextProvider>
  </React.StrictMode>
);
