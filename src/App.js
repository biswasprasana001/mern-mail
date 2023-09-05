// src\App.js
import React, { useState } from 'react';
import EmailForm from './components/EmailForm';
import EmailList from './components/EmailList';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>MERN Mail</h1>
      {user ? (
        <>
          <EmailForm user={user} />
          <EmailList user={user} />
        </>
      ) : (
        <>
          <RegisterComponent />
          <LoginComponent onLogin={setUser} />
        </>
      )}
    </div>
    
  );
}

export default App;