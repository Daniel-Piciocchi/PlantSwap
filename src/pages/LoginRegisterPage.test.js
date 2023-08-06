import { render, screen, fireEvent, within, act } from '@testing-library/react';
import LoginRegisterPage from './LoginRegisterPage';
import { AuthContext } from '../AuthContext';

// Mock the useContext for AuthContext
jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: () => ({ setIsLoggedIn: jest.fn() }),
  };
});

// Mock the useNavigate hook from react-router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('<LoginRegisterPage />', () => {

  test('renders without crashing', () => {
    render(<LoginRegisterPage />);
  });

  test('displays registration form elements', () => {
    render(<LoginRegisterPage />);
    
    const registrationForm = screen.getByTestId('register-form');
    const { getByLabelText, getByText } = within(registrationForm);

    const registerUsernameInput = getByLabelText(/username/i);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const registerButton = getByText(/register/i);

    expect(registerUsernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('displays login form elements', () => {
    render(<LoginRegisterPage />);
    
    const loginForm = screen.getByTestId('login-form');
    const { getByLabelText, getByRole } = within(loginForm);

    const loginUsernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByRole('button', { name: /login/i });

    expect(loginUsernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

});
