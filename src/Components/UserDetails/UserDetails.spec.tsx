import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserDetails from './UserDetails';

const userInfos = {
  id: 1,
  username: 'Joël Miller',
  createdAt: new Date(),
  email: 'joel.miller@gmail.com',
  phone: '0123456789',
};

const handleModifyAccount = jest.fn();

describe('UserDetails view', () => {
  it('should render the details of a user', () => {
    render(<UserDetails userInfos={userInfos} handleModifyAccount={handleModifyAccount} />);
    expect(screen.getByText(/Joël Miller/i)).toBeInTheDocument();
    expect(screen.getByText(/joel\.miller@gmail\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/01\.23\.45\.67\.89/i)).toBeInTheDocument();
  });
});
