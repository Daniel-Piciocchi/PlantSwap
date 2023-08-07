// Import necessary libraries and styles
import React, { useEffect, useState } from 'react';
import axios from 'axios';  // For making HTTP requests
import jwt_decode from 'jwt-decode';  // For decoding JSON Web Tokens

import '../css/Messages.css';  // Importing styles for the component

// Define the MessagesPage component
const MessagesPage = () => {
  // Define state for messages
  const [messages, setMessages] = useState([]);

  // Use the useEffect hook to fetch messages when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch messages
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');  // Retrieve the token from local storage
      const decodedToken = jwt_decode(token);  // Decode the token to get user information
      const userId = decodedToken._id;  // Extract user ID from the decoded token

      console.log('Fetching messages for user:', userId);

      try {
        // Make a GET request to fetch messages for the current user
        const response = await axios.get(`https://plantswap-6dabb95ad1f6.herokuapp.com/swaps/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`  // Pass the token in headers for authentication
          }
        });
        console.log('Fetched messages:', response.data);
        setMessages(response.data);  // Update the state with the fetched messages
      } catch (error) {
        console.error('Error fetching messages:', error);  // Log any error that occurs during the fetch
      }
    };

    fetchMessages();  // Call the fetchMessages function
  }, []);

  // Define a handler to accept a message
  const handleAcceptMessage = async (message) => {
    console.log('Accepting message:', message);
    try {
      const token = localStorage.getItem('token');
      // Make a PUT request to update the status of the message to "Pending"
      await axios.put(`https://plantswap-6dabb95ad1f6.herokuapp.com/swaps/${message._id}`, { status: 'Pending' }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update the local state with the modified status
      const updatedMessages = messages.map(msg => {
        if (msg._id === message._id) {
          return { ...msg, status: 'Pending' };
        }
        return msg;
      });
      setMessages(updatedMessages);

      // Open the email client to allow the user to send a response
      const email = message.requester?.email || '';
      const subject = 'Swap Request Response';
      const body = 'Hi, thanks for requesting a swap! Please send me a photo of what plant you would like to trade!';
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  // Define a handler to reject a message
  const handleReject = async (messageId) => {
    console.log('Rejecting message with ID:', messageId);
    try {
      const token = localStorage.getItem('token');
      // Make a DELETE request to remove the message from the server
      await axios.delete(`https://plantswap-6dabb95ad1f6.herokuapp.com/swaps/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update the local state to remove the rejected message
      setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Render the messages and provide UI to accept or reject each message
  return (
    <div className="plant-swap">
      <h2>Swap Requests</h2>
      <div className="plant-grid">
        {messages.map((message, index) => (
          <div key={index} className="plant-listing">
            <p>From: {message.requester?.username || 'Unknown User'}</p>
            <p>Email: {message.requester?.email || 'Unknown Email'}</p>
            <p>Plant: {message.requestedPlant?.name || 'Unknown Plant'}</p>
            <p>Message: {message.message}</p>
            <div className="plant-buttons">
              {message.status === 'Pending' ? (
                <>
                  <button disabled>Pending</button>
                  <button onClick={() => handleReject(message._id)}>Delete</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleAcceptMessage(message)}>Accept</button>
                  <button onClick={() => handleReject(message._id)}>Reject</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;  // Export the component for use in other parts of the application
