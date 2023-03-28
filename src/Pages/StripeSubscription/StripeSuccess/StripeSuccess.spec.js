import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter, Link } from 'react-router-dom';
import { AuthProvider } from '../../../AuthContext/Authcontext';
import StripeSuccess, { SAVE_USER_SUB } from './StripeSuccess';

const nextMonth = new Date().getMonth() + 1;

const newSubscription = {
  name: 'abonnement',
  info: 'mensuel',
  price: 9.99,
  subscriptionStart: new Date(),
  subscriptionEnd: new Date(new Date().setMonth(nextMonth)),
  subscriptionStatus: 'actif',
};

const mocks = [
  {
    user: {
      email: 'joel.miller@gmail.com',
    },
    request: {
      query: SAVE_USER_SUB,
      variables: {
        email: 'joel.miller@gmail.com',
        subscription: newSubscription,
      },
    },
    result: {
      data: {
        saveSub: { username: 'Joel Miller' },
      },
    },
  },
];

describe('StripeSuccess view', () => {
  it('should detect Link and correct text', () => {
    const user = { email: 'joel.miller@gmail.com' };
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider value={user}>
          <StripeSuccess />
        </AuthProvider>
      </MockedProvider>,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByText(/Merci/i)).toBeInTheDocument();
    expect(screen.findByRole(Link)).toBeTruthy();
  });
});
