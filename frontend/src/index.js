import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Navigate from './navigate';
import { SocketProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketProvider>
    <Router>
      <Navigate />
    </Router>
  </SocketProvider>
);
