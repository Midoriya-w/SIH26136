import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const LoginModal = ({ open, onClose }) => {
  const [tab, setTab] = useState('startup');
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 600 }}>
      <div style={{ width: 520, maxWidth: '95%', background: '#fff', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: 'var(--primary-navy)' }}>Login</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 18 }}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button className={`btn ${tab === 'startup' ? 'btn-apply' : 'btn-outline'}`} onClick={() => setTab('startup')}>Department / Startup Credentials</button>
          <button className={`btn ${tab === 'dpiit' ? 'btn-apply' : 'btn-outline'}`} onClick={() => setTab('dpiit')}>Government SSO</button>
        </div>

        <div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: 12 }}>Please use your registered Samarth credentials to log in or apply.</div>
          <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Email</label>
          <input style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-light)', marginBottom: 12 }} />
          <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Password</label>
          <input type="password" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-light)', marginBottom: 12 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Button variant="apply">Sign in</Button>
            <a href="#" style={{ color: 'var(--primary-navy)', fontWeight: 600 }}>Forgot Password?</a>
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748B' }}>
            Don&apos;t have an account? <Link to="/register" style={{ color: 'var(--primary-navy)', fontWeight: 600 }}>Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
