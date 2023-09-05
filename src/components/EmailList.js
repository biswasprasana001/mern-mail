// src\components\EmailList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmailList({ user }) {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fetch-emails/${user.emailId}`);
        setEmails(response.data.emails);
      } catch (error) {
        console.error('Error fetching emails', error);
      }
    };

    fetchEmails();
  }, [user]);

  return (
    <div>
      <h2>Emails</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>
            <strong>From:</strong> {email.from} <strong>To:</strong> {email.to} <strong>Subject:</strong> {email.subject}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;