import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { Rocket, Landmark, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

const Login = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('startup');
  const [email, setEmail] = useState('contact@agrivision.in');
  const [password, setPassword] = useState('password123');

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    if (roleKey === 'startup') setEmail('contact@agrivision.in');
    if (roleKey === 'government') setEmail('dept.innovation@maharashtra.gov.in');
    if (roleKey === 'evaluator') setEmail('sk.mahajan@evaluators.mahabridge.gov.in');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onRoleChange(selectedRole);
    if (selectedRole === 'startup') navigate('/startup/dashboard');
    if (selectedRole === 'government') navigate('/government/dashboard');
    if (selectedRole === 'evaluator') navigate('/evaluator/dashboard');
  };

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />

      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '520px', width: '100%', background: '#FFFFFF', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 12px 32px rgba(11, 37, 69, 0.1)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src="/logo-icon.png" alt="MIPP" style={{ height: '42px', marginBottom: '0.75rem' }} />
            <h2 style={{ fontSize: '1.5rem', color: '#0B2545' }}>MIPP Portal</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
              Please use your registered MIPP credentials to log in or apply.
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.75rem', background: '#F8FAFC', padding: '6px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <button
              type="button"
              onClick={() => handleRoleSelect('startup')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '10px 4px',
                borderRadius: '8px',
                border: 'none',
                background: selectedRole === 'startup' ? '#FFFFFF' : 'transparent',
                color: selectedRole === 'startup' ? '#0056B3' : '#64748B',
                fontWeight: 700,
                fontSize: '0.75rem',
                boxShadow: selectedRole === 'startup' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              <Rocket size={18} />
              Startup
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('government')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '10px 4px',
                borderRadius: '8px',
                border: 'none',
                background: selectedRole === 'government' ? '#FFFFFF' : 'transparent',
                color: selectedRole === 'government' ? '#138808' : '#64748B',
                fontWeight: 700,
                fontSize: '0.75rem',
                boxShadow: selectedRole === 'government' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              <Landmark size={18} />
              Govt Dept
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('evaluator')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '10px 4px',
                borderRadius: '8px',
                border: 'none',
                background: selectedRole === 'evaluator' ? '#FFFFFF' : 'transparent',
                color: selectedRole === 'evaluator' ? '#7C3AED' : '#64748B',
                fontWeight: 700,
                fontSize: '0.75rem',
                boxShadow: selectedRole === 'evaluator' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              <UserCheck size={18} />
              Evaluator
            </button>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.5rem' }}>
                Department / Startup Credentials
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.5rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <Button variant="navy" type="submit" icon={ArrowRight} style={{ width: '100%', padding: '0.875rem' }}>
              Sign In
            </Button>
          </form>

          <div style={{ marginTop: '1.5rem', background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748B', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="#138808" />
              <span>Government SSO</span>
            </div>
            <a href="#" style={{ color: '#0056B3', fontWeight: 700 }}>Forgot Password?</a>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Login;
