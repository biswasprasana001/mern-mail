// src\App.js
import React from 'react';
import EmailList from './components/EmailList';
import EmailForm from './components/EmailForm';

function App() {
  return (
    <div>
      <h1>Email App</h1>
      <EmailForm />
      <EmailList />
    </div>
  );
}

export default App;