// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.tsx';

// createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './context/ThemeProvider'; // ✅ Import ThemeProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        {' '}
        {/* ✅ Wrap App with ThemeProvider */}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
