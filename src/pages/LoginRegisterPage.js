import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../css/LoginRegister.css'; // Adjusted the path
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const registrationValidationSchema = Yup.object({
  username: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
});

const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const LoginRegisterPage = () => {
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

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
        const data = await response.json(); // Parse the JSON response
        console.log('Token:', data.token); // Log the token
        localStorage.setItem('token', data.token); // Save the token in local storage
        console.log('Logged in successfully');
        setIsLoggedIn(true);
        navigate('/browse-plants');
      }
    },
  });

  return (
    <main className="login-register">
      {accountCreated ? (
        <h1>Account Created!</h1>
      ) : (
        <>
          <h1>Create an Account</h1>
          <form className="register-form" onSubmit={registerFormik.handleSubmit}>
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
      <form className="login-form" onSubmit={loginFormik.handleSubmit}>
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
