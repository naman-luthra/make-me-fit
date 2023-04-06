import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import { App } from './App';
import { PrivateRoute } from './features/Login/PrivateRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './features/Login/SignIn';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
