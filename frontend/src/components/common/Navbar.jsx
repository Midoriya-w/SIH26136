import React, { useState } from 'react';
import { Link as RouterLink, useNavigate as useRouterNavigate, useLocation } from 'react-router-dom';
import { Globe, Eye, ChevronDown, LogOut } from 'lucide-react';

const Navbar = ({ currentUser, onRoleChange }) => {
  const navigate = useRouterNavigate();
  const location = useLocation();
  const [lang, setLang] = useState('EN');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [isDemoAuthenticated, setIsDemoAuthenticated] = useState(() => sessionStorage.getItem('mipp-demo-auth') === 'true');

  const handleLogout = () => {
    sessionStorage.removeItem('mipp-demo-auth');
    setIsDemoAuthenticated(false);
    setShowRoleDropdown(false);
    navigate('/login');
  };

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
        <RouterLink to="/" className="brand-section" aria-label="Samarth home">
          <img src="/logo-icon.png" alt="Samarth logo" className="brand-emblem" style={{ width: 40, height: 40 }} />
          <div className="brand-divider" />
          <div className="brand-meta">
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: 0.4 }}>Samarth</div>
            <div style={{ fontSize: '0.68rem', color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Government Innovation Procurement Portal</div>
          </div>
        </RouterLink>

        <nav>
          <ul className="nav-links">
            <li><RouterLink to="/" className={`nav-item-link ${location.pathname === '/' ? 'active' : ''}`}>Home</RouterLink></li>
            <li><RouterLink to="/how-it-works" className={`nav-item-link ${location.pathname === '/how-it-works' ? 'active' : ''}`}>How It Works</RouterLink></li>
            <li><RouterLink to="/startup/challenges" className={`nav-item-link ${location.pathname.includes('/startup/challenges') ? 'active' : ''}`}>Browse Challenges</RouterLink></li>
            <li><RouterLink to="/success-stories" className={`nav-item-link ${location.pathname === '/success-stories' ? 'active' : ''}`}>Success Stories</RouterLink></li>
            <li><RouterLink to="/templates" className={`nav-item-link ${location.pathname === '/templates' ? 'active' : ''}`}>Templates Library</RouterLink></li>
            <li><RouterLink to="/contact" className={`nav-item-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact Us</RouterLink></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!isDemoAuthenticated && <button className="btn btn-outline" onClick={() => navigate('/login')}>LOGIN</button>}
          {!isDemoAuthenticated && <button className="btn btn-apply" onClick={() => navigate('/register')}>REGISTER</button>}
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
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#C53030', fontWeight: 700, border: 'none', background: 'transparent', padding: 0 }}>
                  <LogOut size={14} /> Re-authenticate / Logout
                </button>
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
};

export default Navbar;
