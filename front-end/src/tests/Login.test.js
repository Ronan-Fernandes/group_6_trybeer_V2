import React from 'react';

import userEvent from '@testing-library/user-event';
import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
// import { waitForElementToBeRemoved } from 'react-testing-library';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login/Login';

test('Check if Elements are present in the Login page', () => {
  const { getByText } = renderWithRouter(<Login />);
  const Email = getByText('Email');
  const password = getByText('Password');
  const ENTRAR = getByText('ENTRAR');

  expect(Email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(ENTRAR).toBeInTheDocument();
});

test('Test login button is disable if email is not valid', () => {
  const { getByText } = renderWithRouter(<Login />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const button = screen.getByTestId('signin-btn');
  userEvent.type(passwordInput, '1234567');

  userEvent.type(emailInput, 'notvalid@gmail');
  expect(button).toBeDisabled();
  userEvent.type(emailInput, 'notvalidgmail');
  expect(button).toBeDisabled();
  userEvent.type(emailInput, '');
  expect(button).toBeDisabled();
});

test('Test login button is disable if password is less than 6 character', () => {
  const { getByText } = renderWithRouter(<Login />);
  const passwordInput = screen.getByTestId('password-input');
  const emailInput = screen.getByTestId('email-input');
  const button = screen.getByTestId('signin-btn');

  userEvent.type(emailInput, 'valid@gmail.com');
  userEvent.type(passwordInput, '12345');
  expect(button).toBeDisabled();
});

test('Test that button "Ainda não tenho conta"  send to register page', async () => {
  const { history } = renderWithRouter(<Login />);
  const button = screen.getByTestId('no-account-btn');

  await fireEvent.click(button);

  expect(history.location.pathname).toBe('/register');

  setTimeout(() => {
    screen.getByTestId('email-input');
    expect(screen.getByTestId('signup-name')).toBeInTheDocument();
  }, 1500);
});

test('Test that is it possible to log with valid emailpassword', async () => {
  const { history } = renderWithRouter(<Login />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const button = screen.getByTestId('signin-btn');

  userEvent.type(emailInput, 'zebirita@gmail.com');
  userEvent.type(passwordInput, '12345678');

  await fireEvent.click(button);
  await waitFor(() => {
    expect(button).toBeInTheDocument();
    expect(history.location.pathname).toBe('/products');
  });
  \
});
