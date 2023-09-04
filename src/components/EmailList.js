// components\EmailList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmailList() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const response = await axios.get('http://localhost:5000/emails');
      setEmails(response.data);
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h2>Email List</h2>
      <ul>
        {emails.map(email => (
          <li key={email._id}>
            <strong>To:</strong> {email.to} <br />
            <strong>Subject:</strong> {email.subject} <br />
            <strong>Message:</strong> {email.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;