import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { MOCK_USERS } from './data/mockData';

function App() {
  const [currentRoleKey, setCurrentRoleKey] = useState('startup');

  const handleRoleChange = (roleKey) => {
    setCurrentRoleKey(roleKey);
  };

  const currentUser = MOCK_USERS[currentRoleKey] || MOCK_USERS.startup;

  return (
    <Router>
      <AppRoutes currentUser={currentUser} onRoleChange={handleRoleChange} />
    </Router>
  );
}

export default App;
