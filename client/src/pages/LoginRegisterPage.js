// Importing necessary modules and styles
import React, { useState, useContext } from 'react';
import { useFormik } from 'formik'; // Importing formik for form handling
import * as Yup from 'yup'; // Importing Yup for form validation
import '../css/LoginRegister.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

// Validation schema for registration form
const registrationValidationSchema = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
});

// Validation schema for login form
const loginValidationSchema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginRegisterPage = () => {
  // State variables to manage account creation and navigation
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext); // Context to manage user authentication state

  // Formik for the registration form
  const registerFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: registrationValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });
      if (response.ok) {
        setAccountCreated(true);
      }
    },
  });

  // Formik for the login form
  const loginFormik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token); // Store the authentication token in local storage
        console.log('Logged in successfully');
        setIsLoggedIn(true); // Set the authentication state to logged in
        navigate('/browse-plants'); // Navigate to the browse plants page after successful login
      }
    },
  });

  // Render the component
  return (
    <main className="login-register">
      {accountCreated ? (
        <h1>Account Created!</h1>
      ) : (
        <>
          <h1>Create an Account</h1>
          <form className="register-form" data-testid="register-form" onSubmit={registerFormik.handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.username}
              />
              {registerFormik.errors.username ? <div>{registerFormik.errors.username}</div> : null}
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.email}
              />
              {registerFormik.errors.email ? <div>{registerFormik.errors.email}</div> : null}
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.password}
              />
              {registerFormik.errors.password ? <div>{registerFormik.errors.password}</div> : null}
            </label>
            <button type="submit">Register</button>
          </form>
        </>
      )}

      <h2>Login</h2>
      <form className="login-form" data-testid="login-form" onSubmit={loginFormik.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.username}
          />
          {loginFormik.errors.username ? <div>{loginFormik.errors.username}</div> : null}
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.password}
          />
          {loginFormik.errors.password ? <div>{loginFormik.errors.password}</div> : null}
        </label>
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default LoginRegisterPage;
