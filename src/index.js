import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/app-context';
//
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
  <AppProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AppProvider>,
  document.getElementById('root')
);

reportWebVitals();
