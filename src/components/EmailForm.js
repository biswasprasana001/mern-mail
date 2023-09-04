// components\EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';

function EmailForm() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/emails', formData);
    setFormData({
      to: '',
      subject: '',
      message: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>To:</label>
        <input type="text" name="to" value={formData.to} onChange={handleChange} />
      </div>
      <div>
        <label>Subject:</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default EmailForm;