// LoginRegisterPage.js
import React from 'react';
import '../css/LoginRegister.css'; // Import the CSS

const LoginRegisterPage = () => (
  <main className="login-register">
    <h1>Create an Account</h1>
    <form className="register-form">
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Register</button>
    </form>

    <h2>Login</h2>
    <form className="login-form">
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  </main>
);

export default LoginRegisterPage;