import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // nơi bạn để CSS toàn cục hoặc import Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
