// src\components\RegisterComponent.js.
import React, { useState } from 'react';
import axios from 'axios';

function RegisterComponent() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');
  const [status, setStatus] = useState('');

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { name, password, emailId });
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Error registering user');
    }
  };

  return (
    <div>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Email ID (without @mernmail)" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
      <button onClick={register}>Register</button>
      <p>{status}</p>
    </div>
  );
}

export default RegisterComponent;