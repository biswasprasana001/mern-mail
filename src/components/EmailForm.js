// components\EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';

function EmailForm({ user }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-email', { userId: user._id, to, subject, message });
      setStatus(response.data.message);
    } catch (error) { 
      setStatus('Error sending email');
    }
  };

  return (
    <div>
      <input type="email" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      <button onClick={sendEmail}>Send Email</button>
      <p>{status}</p>
    </div>
  );
}

export default EmailForm;