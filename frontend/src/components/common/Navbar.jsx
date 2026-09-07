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
};
export default Navbar;
