import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

const DashboardProvider = ({ children }: any) => (
  <Provider store={store}>
    {
      children
    }
  </Provider>
);

export default DashboardProvider;
