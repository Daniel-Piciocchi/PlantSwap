// ContactPage.js
import React from 'react';
import '../css/Contact.css'; // Import the CSS

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <form>
        <div className="form-group">
          <label>
            Name:
            <input type="text" name="name" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input type="email" name="email" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Message:
            <textarea name="message" />
          </label>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
