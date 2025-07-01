'use client';

import { Provider } from 'react-redux';
import store from './store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from '../common/utills/i18n.js';

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  );
};

export default ReduxWrapper;
