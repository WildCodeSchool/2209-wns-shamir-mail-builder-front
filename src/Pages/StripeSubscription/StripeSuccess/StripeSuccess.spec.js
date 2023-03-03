import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Link } from 'react-router-dom';
import StripeSuccess from './StripeSuccess';

describe('StripeSuccess view', () => {
  it('should detect Link and correct text', () => {
    render(<StripeSuccess />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Merci/i)).toBeInTheDocument();
    expect(screen.findByRole(Link)).toBeTruthy();
  });
});
