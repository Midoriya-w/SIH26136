import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  FileText,
  User,
  PlusCircle,
  Building2,
  CheckSquare,
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';

const Sidebar = ({ role = 'startup' }) => {
  const startupLinks = [
    { to: '/startup/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/startup/profile', label: 'Startup Profile', icon: User },
    { to: '/startup/challenges', label: 'Govt Challenges', icon: Rocket },
    { to: '/startup/applications', label: 'My Applications', icon: FileText }
  ];

  const govtLinks = [
    { to: '/government/dashboard', label: 'Department Analytics', icon: LayoutDashboard },
    { to: '/government/challenges', label: 'Manage Challenges', icon: Layers },
    { to: '/government/create-challenge', label: 'Post New Challenge', icon: PlusCircle },
    { to: '/government/applications', label: 'Pilot Applications', icon: Award },
    { to: '/government/startups', label: 'Startup Directory', icon: Building2 }
  ];

  const evaluatorLinks = [
    { to: '/evaluator/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/evaluator/assigned', label: 'Assigned Applications', icon: CheckSquare }
  ];

  const getLinks = () => {
    if (role === 'government') return govtLinks;
    if (role === 'evaluator') return evaluatorLinks;
    return startupLinks;
  };

  const links = getLinks();

  return (
    <aside className="sidebar">
      <div>
        <div style={{ padding: '0 0.5rem 1rem 0.5rem', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.5px' }}>
            {role === 'government' ? 'Government Dept' : role === 'evaluator' ? 'Expert Evaluator' : 'Startup Portal'}
          </div>
        </div>

        <ul className="sidebar-menu">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sidebar Help Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #F0F5FF 0%, #EEF2F6 100%)',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid #CBD5E1'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B2545', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
          <HelpCircle size={16} color="#0056B3" /> MSINS Support
        </div>
        <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4, marginBottom: '8px' }}>
          Need assistance with pilot procurement guidelines or technical evaluation?
        </p>
        <a
          href="mailto:support@mahabridge.gov.in"
          style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0056B3', textDecoration: 'underline' }}
        >
          support@mahabridge.gov.in
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
