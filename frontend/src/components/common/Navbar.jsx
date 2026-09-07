 codex/redesign-samarth
import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, ChevronDown, FileText, Home, Landmark, Library, LogIn, Mail, Search, UserPlus } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/', icon: Home }, { label: 'Pages', to: '/how-it-works', icon: FileText },
  { label: 'Department', to: '/government/challenges', icon: Landmark, menu: [{ label: 'Department overview', to: '/government/dashboard' }, { label: 'Manage challenges', to: '/government/challenges' }, { label: 'Post a challenge', to: '/government/create-challenge' }] }, { label: 'Events', to: '/success-stories', icon: CalendarDays },
  { label: 'Resources', to: '/templates', icon: Library }, { label: 'Contact', to: '/contact', icon: Mail }
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return <header className="navbar-header egovt-header">
    <div className="navbar-container">
      <RouterLink to="/" className="brand-section" aria-label="Samarth home"><img src="/icon logo.png" alt="Samarth" className="brand-emblem" /><div className="brand-meta"><strong>Samarth</strong><span>Innovation procurement portal</span></div></RouterLink>
      <nav className="text-navigation" aria-label="Main navigation"><ul>{navItems.map(({ label, to, icon: Icon, menu }) => <li key={to} className={menu ? 'has-submenu' : ''}><RouterLink className={location.pathname === to ? 'active' : ''} to={to}><Icon size={14} />{label}<ChevronDown size={13} /></RouterLink>{menu && <div className="nav-submenu">{menu.map(entry => <RouterLink key={entry.to} to={entry.to}>{entry.label}</RouterLink>)}</div>}</li>)}</ul></nav>
      <div className="nav-actions"><button className="nav-search" aria-label="Search"><Search size={18} /></button><button className="nav-login auth-icon" onClick={() => navigate('/login')} aria-label="Login" title="Login"><LogIn size={18} /><span>Login</span></button><button className="nav-register auth-icon" onClick={() => navigate('/login')} aria-label="Register" title="Register"><UserPlus size={18} /><span>Register</span></button></div>
    </div>
  </header>;

import React, { useState } from 'react';
import { Link as RouterLink, useNavigate as useRouterNavigate, useLocation } from 'react-router-dom';
import { Globe, Eye, ChevronDown, LogOut } from 'lucide-react';

const Navbar = ({ currentUser, onRoleChange }) => {
  const navigate = useRouterNavigate();
  const location = useLocation();
  const [lang, setLang] = useState('EN');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <header className="navbar-header">
      {/* Top utility strip */}
      <div className="govt-top-bar">
        <div className="govt-top-left">
          <img src="/maharashtra-emblem.svg" alt="Government of Maharashtra emblem" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          <span style={{ fontWeight: 700 }}>Government of Maharashtra</span>
        </div>

        <div className="govt-top-right">
          <button className="top-bar-btn" onClick={() => setLang(lang === 'EN' ? 'MR' : 'EN')}>
            <Globe size={12} style={{ display: 'inline', marginRight: '6px' }} /> {lang === 'EN' ? 'मराठी' : 'English'}
          </button>
        </div>
      </div>

      {/* Main header */}
      <div className="navbar-container">
        <RouterLink to="/" className="brand-section" aria-label="MIPP home">
          <img src="/logo-icon.png" alt="MIPP logo" className="brand-emblem" style={{ width: 40, height: 40 }} />
          <div className="brand-divider" />
          <div className="brand-meta">
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: 0.4 }}>MIPP</div>
            <div style={{ fontSize: '0.68rem', color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Maharashtra Innovation Procurement Portal</div>
          </div>
        </RouterLink>

        <nav>
          <ul className="nav-links">
            <li><RouterLink to="/" className={`nav-item-link ${location.pathname === '/' ? 'active' : ''}`}>Home</RouterLink></li>
            <li><RouterLink to="/how-it-works" className={`nav-item-link ${location.pathname === '/how-it-works' ? 'active' : ''}`}>How It Works</RouterLink></li>
            <li><RouterLink to="/startup/challenges" className={`nav-item-link ${location.pathname.includes('/startup/challenges') ? 'active' : ''}`}>Browse Challenges</RouterLink></li>
            <li><RouterLink to="/success-stories" className={`nav-item-link ${location.pathname === '/success-stories' ? 'active' : ''}`}>Success Stories</RouterLink></li>
            <li><RouterLink to="/templates" className={`nav-item-link ${location.pathname === '/templates' ? 'active' : ''}`}>Templates Library</RouterLink></li>
            <li><RouterLink to="/faq" className={`nav-item-link ${location.pathname === '/faq' ? 'active' : ''}`}>F.A.Q.</RouterLink></li>
            <li><RouterLink to="/contact" className={`nav-item-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact Us</RouterLink></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-outline" onClick={() => navigate('/login')}>LOGIN</button>
          <RouterLink to="/government/create-challenge" className="btn btn-apply">POST A CHALLENGE</RouterLink>

          <div style={{ position: 'relative' }}>
            {currentUser && (
              <button onClick={() => setShowRoleDropdown(!showRoleDropdown)} className="user-profile-badge" aria-label="User menu">
                <img src={currentUser.avatar} alt={currentUser.name} style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <ChevronDown size={14} />
              </button>
            )}

            {showRoleDropdown && (
              <div style={{ position: 'absolute', right: 0, top: '110%', width: 260, background: '#fff', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.12)', padding: 8 }}>
                <RouterLink to="/login" onClick={() => setShowRoleDropdown(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#C53030', fontWeight: 700 }}>
                  <LogOut size={14} /> Re-authenticate / Logout
                </RouterLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Announcement ribbon */}
      <div className="announcement-ribbon">
        <div className="announcement-inner">
          <div className="announcement-tag">Update</div>
          <div className="announcement-text">New Challenge Window Open — Urban Development Dept, closes 15 Oct 2026</div>
        </div>
      </div>
    </header>
  );
main
};
export default Navbar;
