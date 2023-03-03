import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Link } from 'react-router-dom';
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
    request: {
      mutation: SAVE_USER_SUB,
      variables: {
        email: 'joel.miller@gmail.com',
        subscription: newSubscription,
      },
    },
    result: {
      data: {
        saveUserSub: { username: 'Joel Miller' },
      },
    },
  },
];

describe('StripeSuccess view', () => {
  it('should detect Link and correct text', () => {
    render(<MockedProvider mocks={mocks}><StripeSuccess /></MockedProvider>, { wrapper: BrowserRouter });
    expect(screen.getByText(/Merci/i)).toBeInTheDocument();
    expect(screen.findByRole(Link)).toBeTruthy();
  });
});
