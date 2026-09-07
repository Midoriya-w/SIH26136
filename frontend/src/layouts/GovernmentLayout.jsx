import React from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const GovernmentLayout = ({ children, currentUser, onRoleChange }) => {
  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />
      <div className="dashboard-layout">
        <Sidebar role="government" />
        <main className="dashboard-main animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default GovernmentLayout;
