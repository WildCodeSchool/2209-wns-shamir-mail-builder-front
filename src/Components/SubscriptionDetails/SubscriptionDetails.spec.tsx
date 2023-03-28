import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SubscriptionDetails from './SubscriptionDetails';

const nextMonth = new Date().getMonth() + 1;

const subDetails = {
  info: 'Mensuel',
  price: 9.99,
  subscriptionStart: new Date(),
  subscriptionEnd: new Date(new Date().setMonth(nextMonth)),
  subscriptionStatus: 'actif',
};

describe('SubscriptionDetails view', () => {
  it('should render the subscription details of a user', () => {
    render(<SubscriptionDetails subDetails={subDetails} />);
    expect(screen.getByText(/Mensuel/i)).toBeInTheDocument();
    expect(screen.getByText(/9\.99€/i)).toBeInTheDocument();
    expect(screen.getByText(/actif/i)).toBeInTheDocument();
  });
});
