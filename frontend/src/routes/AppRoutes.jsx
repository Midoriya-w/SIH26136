import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

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

const PageTransition = ({ children }) => (
  <motion.div
    className="route-transition"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const AppRoutes = ({ currentUser, onRoleChange }) => {
  const location = useLocation();
  const page = (element) => <PageTransition>{element}</PageTransition>;

  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={page(<Landing currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/login" element={page(<Login currentUser={currentUser} onRoleChange={onRoleChange} />)} />

      {/* Startup Routes */}
      <Route path="/startup/dashboard" element={page(<StartupDashboard currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/startup/profile" element={page(<StartupProfile currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/startup/challenges" element={page(<StartupChallenges currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/startup/challenges/:id" element={page(<ChallengeDetails currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/startup/applications" element={page(<StartupApplications currentUser={currentUser} onRoleChange={onRoleChange} />)} />

      {/* Government Department Routes */}
      <Route path="/government/dashboard" element={page(<GovernmentDashboard currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/government/challenges" element={page(<GovernmentChallenges currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/government/create-challenge" element={page(<CreateChallenge currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/government/startups" element={page(<GovernmentStartups currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/government/applications" element={page(<GovernmentApplications currentUser={currentUser} onRoleChange={onRoleChange} />)} />

      {/* Evaluator Routes */}
      <Route path="/evaluator/dashboard" element={page(<EvaluatorDashboard currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/evaluator/assigned" element={page(<AssignedApplications currentUser={currentUser} onRoleChange={onRoleChange} />)} />
      <Route path="/evaluator/evaluate/:id" element={page(<EvaluatePage currentUser={currentUser} onRoleChange={onRoleChange} />)} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
