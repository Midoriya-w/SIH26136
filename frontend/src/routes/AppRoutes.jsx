import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';

// Startup Pages
import StartupDashboard from '../pages/startup/Dashboard';
import StartupProfile from '../pages/startup/Profile';
import StartupChallenges from '../pages/startup/Challenges';
import ChallengeDetails from '../pages/startup/ChallengeDetails';
import StartupApplications from '../pages/startup/Applications';

// Government Pages
import GovernmentDashboard from '../pages/government/Dashboard';
import GovernmentChallenges from '../pages/government/Challenges';
import CreateChallenge from '../pages/government/CreateChallenge';
import GovernmentStartups from '../pages/government/Startups';
import GovernmentApplications from '../pages/government/Applications';

// Evaluator Pages
import EvaluatorDashboard from '../pages/evaluator/Dashboard';
import AssignedApplications from '../pages/evaluator/AssignedApplications';
import EvaluatePage from '../pages/evaluator/Evaluate';

const AppRoutes = ({ currentUser, onRoleChange }) => {
  return (
    <Routes>
      <Route path="/" element={<Landing currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/login" element={<Login currentUser={currentUser} onRoleChange={onRoleChange} />} />

      {/* Startup Routes */}
      <Route path="/startup/dashboard" element={<StartupDashboard currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/startup/profile" element={<StartupProfile currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/startup/challenges" element={<StartupChallenges currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/startup/challenges/:id" element={<ChallengeDetails currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/startup/applications" element={<StartupApplications currentUser={currentUser} onRoleChange={onRoleChange} />} />

      {/* Government Department Routes */}
      <Route path="/government/dashboard" element={<GovernmentDashboard currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/government/challenges" element={<GovernmentChallenges currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/government/create-challenge" element={<CreateChallenge currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/government/startups" element={<GovernmentStartups currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/government/applications" element={<GovernmentApplications currentUser={currentUser} onRoleChange={onRoleChange} />} />

      {/* Evaluator Routes */}
      <Route path="/evaluator/dashboard" element={<EvaluatorDashboard currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/evaluator/assigned" element={<AssignedApplications currentUser={currentUser} onRoleChange={onRoleChange} />} />
      <Route path="/evaluator/evaluate/:id" element={<EvaluatePage currentUser={currentUser} onRoleChange={onRoleChange} />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
