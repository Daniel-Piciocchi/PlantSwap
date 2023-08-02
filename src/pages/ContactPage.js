// ContactPage.js
import React from 'react';
import '../css/Contact.css'; // Import the CSS

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <form>
        <div className="form-group">
          <input type="text" name="name" placeholder="Name" />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <textarea name="message" placeholder="Message..." />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
