import React, { useState } from 'react';
import { Link as RouterLink, useNavigate as useRouterNavigate, useLocation } from 'react-router-dom';
import { MOCK_USERS } from '../../data/mockData';
import {
  Globe,
  Eye,
  Sliders,
  ChevronDown,
  Building,
  UserCheck,
  Rocket,
  LogOut,
  Landmark
} from 'lucide-react';

const Navbar = ({ currentUser, onRoleChange }) => {
  const navigate = useRouterNavigate();
  const location = useLocation();
  const [contrastHigh, setContrastHigh] = useState(false);
  const [lang, setLang] = useState('EN');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const toggleContrast = () => {
    setContrastHigh(!contrastHigh);
    document.body.classList.toggle('contrast-high');
  };

  const handleFontChange = (mode) => {
    document.body.classList.remove('font-small', 'font-large');
    if (mode === 'large') document.body.classList.add('font-large');
    if (mode === 'small') document.body.classList.add('font-small');
  };

  const selectRole = (roleKey) => {
    onRoleChange(roleKey);
    setShowRoleDropdown(false);
    if (roleKey === 'startup') navigate('/startup/dashboard');
    if (roleKey === 'government') navigate('/government/dashboard');
    if (roleKey === 'evaluator') navigate('/evaluator/dashboard');
  };

  return (
    <header className="navbar-header">
      {/* Top Govt Accessibility Strip */}
      <div className="govt-top-bar">
        <div className="govt-top-left">
          <div className="govt-flag-strip">
            <div className="flag-orange"></div>
            <div className="flag-white"></div>
            <div className="flag-green"></div>
          </div>
          <span style={{ fontWeight: 600 }}>Government of Maharashtra</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span style={{ opacity: 0.85 }}>Department of Skills, Employment, Entrepreneurship & Innovation</span>
        </div>

        <div className="govt-top-right">
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <button className="top-bar-btn" onClick={() => handleFontChange('small')}>A-</button>
            <button className="top-bar-btn" onClick={() => handleFontChange('normal')}>A</button>
            <button className="top-bar-btn" onClick={() => handleFontChange('large')}>A+</button>
          </div>
          <button className="top-bar-btn" onClick={toggleContrast} title="High Contrast Mode">
            <Eye size={12} style={{ display: 'inline', marginRight: '4px' }} />
            {contrastHigh ? 'Normal' : 'High Contrast'}
          </button>
          <button
            className="top-bar-btn"
            onClick={() => setLang(lang === 'EN' ? 'MR' : 'EN')}
          >
            <Globe size={12} style={{ display: 'inline', marginRight: '4px' }} />
            {lang === 'EN' ? 'मराठी' : 'English'}
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="navbar-container">
        <RouterLink to="/" className="brand-section">
          <img src="/maharashtra-emblem.svg" alt="Govt Crest" className="brand-emblem" />
          <div className="brand-divider"></div>
          <div>
            <img src="/logo.svg" alt="MahaBridge Logo" style={{ height: '36px' }} />
            <div className="sub-dept-name">Govt Challenges. Startup Solutions. Real Impact.</div>
          </div>
        </RouterLink>

        {/* Navigation Options */}
        <nav>
          <ul className="nav-links">
            <li>
              <RouterLink
                to="/"
                className={`nav-item-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home Portal
              </RouterLink>
            </li>
            
            {currentUser && (
              <>
                {currentUser.role === 'startup' && (
                  <>
                    <li>
                      <RouterLink
                        to="/startup/dashboard"
                        className={`nav-item-link ${location.pathname.includes('/startup/dashboard') ? 'active' : ''}`}
                      >
                        Dashboard
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/startup/challenges"
                        className={`nav-item-link ${location.pathname.includes('/startup/challenges') ? 'active' : ''}`}
                      >
                        Govt Challenges
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/startup/applications"
                        className={`nav-item-link ${location.pathname.includes('/startup/applications') ? 'active' : ''}`}
                      >
                        My Applications
                      </RouterLink>
                    </li>
                  </>
                )}

                {currentUser.role === 'government' && (
                  <>
                    <li>
                      <RouterLink
                        to="/government/dashboard"
                        className={`nav-item-link ${location.pathname.includes('/government/dashboard') ? 'active' : ''}`}
                      >
                        Department Overview
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/government/challenges"
                        className={`nav-item-link ${location.pathname.includes('/government/challenges') ? 'active' : ''}`}
                      >
                        Manage Challenges
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/government/applications"
                        className={`nav-item-link ${location.pathname.includes('/government/applications') ? 'active' : ''}`}
                      >
                        Pilot Applications
                      </RouterLink>
                    </li>
                  </>
                )}

                {currentUser.role === 'evaluator' && (
                  <>
                    <li>
                      <RouterLink
                        to="/evaluator/dashboard"
                        className={`nav-item-link ${location.pathname.includes('/evaluator/dashboard') ? 'active' : ''}`}
                      >
                        Evaluator Queue
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/evaluator/assigned"
                        className={`nav-item-link ${location.pathname.includes('/evaluator/assigned') ? 'active' : ''}`}
                      >
                        Assigned Proposals
                      </RouterLink>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>

        {/* User Account / Role Switcher */}
        <div style={{ position: 'relative' }}>
          {currentUser ? (
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="user-profile-badge"
              style={{ cursor: 'pointer', border: '1px solid #CBD5E1' }}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0B2545' }}>
                  {currentUser.name}
                </div>
                <span className={`role-tag ${currentUser.role}`}>
                  {currentUser.roleLabel}
                </span>
              </div>
              <ChevronDown size={14} style={{ color: '#64748B' }} />
            </button>
          ) : (
            <RouterLink to="/login" className="btn btn-navy btn-sm">
              Portal Sign In
            </RouterLink>
          )}

          {/* Role Switcher Dropdown */}
          {showRoleDropdown && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '110%',
                width: '260px',
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                border: '1px solid #E2E8F0',
                padding: '0.5rem',
                zIndex: 200
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 12px' }}>
                Switch Active Portal Role
              </div>
              
              <button
                onClick={() => selectRole('startup')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  background: currentUser?.role === 'startup' ? '#EFF6FF' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: '4px'
                }}
              >
                <Rocket size={16} color="#0056B3" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B2545' }}>Startup Portal</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Build, Apply, Track & Grow</div>
                </div>
              </button>

              <button
                onClick={() => selectRole('government')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  background: currentUser?.role === 'government' ? '#ECFDF5' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: '4px'
                }}
              >
                <Landmark size={16} color="#138808" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B2545' }}>Government Dept</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Post Challenges & Award Pilots</div>
                </div>
              </button>

              <button
                onClick={() => selectRole('evaluator')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  background: currentUser?.role === 'evaluator' ? '#F3E8FF' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <UserCheck size={16} color="#7C3AED" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B2545' }}>Evaluator Expert</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Score Proposals & Give Feedback</div>
                </div>
              </button>

              <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '6px', paddingTop: '6px' }}>
                <RouterLink
                  to="/login"
                  onClick={() => setShowRoleDropdown(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    color: '#DC2626',
                    fontWeight: 600
                  }}
                >
                  <LogOut size={14} /> Re-authenticate / Logout
                </RouterLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
