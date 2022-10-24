import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CharacterContextProvider } from './components/CharacterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CharacterContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CharacterContextProvider>
  </BrowserRouter>
);
