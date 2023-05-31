import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import App from './src/App';
import { store } from './src/store';
import * as Sentry from '@sentry/browser';

if (import.meta.env.NODE_ENV !== 'production') {
  Sentry.init({
    dsn: import.meta.env.REACT_APP_SENTRY_DSN,
    beforeBreadcrumb(breadcrumb) {
      return breadcrumb.category === 'ui.click' ? null : breadcrumb;
    }
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
