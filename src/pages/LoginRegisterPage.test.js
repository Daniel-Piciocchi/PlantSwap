// Import necessary utilities from `@testing-library/react`
import { render, screen, fireEvent, within, act } from '@testing-library/react';

// Import the component and context to be tested
import LoginRegisterPage from './LoginRegisterPage';
import { AuthContext } from '../AuthContext';

// Mock the useContext hook from React to simulate the AuthContext's setIsLoggedIn function
jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: () => ({ setIsLoggedIn: jest.fn() }), // Mocked setIsLoggedIn function
  };
});

// Mock the useNavigate hook from react-router to avoid actual navigation during tests
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mocked useNavigate function
}));

// Group of tests for the <LoginRegisterPage /> component
describe('<LoginRegisterPage />', () => {

  // Test to ensure the LoginRegisterPage component renders without errors
  test('renders without crashing', () => {
    render(<LoginRegisterPage />);
  });

  // Test to verify that the registration form elements are rendered correctly
  test('displays registration form elements', () => {
    render(<LoginRegisterPage />);
    
    // Obtain the registration form using its test ID
    const registrationForm = screen.getByTestId('register-form');

    // Utilize the `within` function to scope queries to the registration form
    const { getByLabelText, getByText } = within(registrationForm);

    // Find individual form elements by their labels and text
    const registerUsernameInput = getByLabelText(/username/i);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const registerButton = getByText(/register/i);

    // Assert that each form element is present in the document
    expect(registerUsernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  // Test to verify that the login form elements are rendered correctly
  test('displays login form elements', () => {
    render(<LoginRegisterPage />);
    
    // Obtain the login form using its test ID
    const loginForm = screen.getByTestId('login-form');

    // Utilize the `within` function to scope queries to the login form
    const { getByLabelText, getByRole } = within(loginForm);

    // Find individual form elements by their labels and roles
    const loginUsernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByRole('button', { name: /login/i });

    // Assert that each form element is present in the document
    expect(loginUsernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

});
