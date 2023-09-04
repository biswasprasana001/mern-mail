// src\components\LoginComponent.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginComponent({ onLogin }) {
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');
  const [status, setStatus] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { password, emailId });
      if (response.data.user) {
        onLogin(response.data.user);
      }
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Error logging in');
    }
  };

  return (
    <div>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Email ID (without @mernmail)" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
      <button onClick={login}>Login</button>
      <p>{status}</p>
    </div>
  );
}

export default LoginComponent;