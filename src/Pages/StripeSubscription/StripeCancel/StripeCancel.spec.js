import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Link } from 'react-router-dom';
import StripeCancel from './StripeCancel';

describe('StripeCancel view', () => {
  it('should detect Link and correct text', () => {
    render(<StripeCancel />, { wrapper: BrowserRouter });
    expect(screen.getByText(/prochaine fois/i)).toBeInTheDocument();
    expect(screen.findByRole(Link)).toBeTruthy();
  });
});
