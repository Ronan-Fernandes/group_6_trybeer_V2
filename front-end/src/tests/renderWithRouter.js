import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../store/';

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(
      <>
        <Provider store={store}>
          <Router history={history}>{ui}</Router>
        </Provider>
      </>,
    ),
    history,
  };
}
export default renderWithRouter;
