import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import '../css/Messages.css';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;

      try {
        const response = await axios.get(`http://localhost:5001/swaps/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleAcceptMessage = async (message) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5001/swaps/${message._id}`, { status: 'Pending' }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedMessages = messages.map(msg => {
        if (msg._id === message._id) {
          return { ...msg, status: 'Pending' };
        }
        return msg;
      });
      setMessages(updatedMessages);

      // Open email client
      const email = message.requester?.email || '';
      const subject = 'Swap Request Response';
      window.location.href = `mailto:${email}?subject=${subject}`;

    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleReject = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/swaps/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

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

export default MessagesPage;
