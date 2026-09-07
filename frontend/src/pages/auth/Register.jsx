import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { ArrowRight, CheckCircle2, Rocket, ShieldCheck } from 'lucide-react';

const Register = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('startup');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />
      <main className="main-content auth-page">
        <div className="auth-card">
          {submitted ? (
            <div className="auth-success">
              <CheckCircle2 size={52} color="#138808" />
              <h1>Registration request received</h1>
              <p>We will review your details and send an activation link to your email address.</p>
              <button type="button" className="btn btn-apply" onClick={() => navigate('/login')}>Continue to login <ArrowRight size={16} /></button>
            </div>
          ) : (
            <>
              <div className="auth-heading">
                <div className="auth-logo"><Rocket size={24} /></div>
                <span className="auth-eyebrow">Join the innovation network</span>
                <h1>Create your Samarth account</h1>
                <p>Register once to discover challenges, submit proposals, and track your impact.</p>
              </div>
              <form onSubmit={handleSubmit} className="register-form">
                <div className="register-role-grid">
                  <button type="button" className={role === 'startup' ? 'selected' : ''} onClick={() => setRole('startup')}><strong>Startup / Solution provider</strong><span>Apply to public challenges</span></button>
                  <button type="button" className={role === 'government' ? 'selected' : ''} onClick={() => setRole('government')}><strong>Government department</strong><span>Post and manage challenges</span></button>
                </div>
                <label>Full name<input required type="text" placeholder="Your full name" /></label>
                <label>Work email<input required type="email" placeholder="you@organisation.in" /></label>
                <label>Organisation name<input required type="text" placeholder="Organisation or startup name" /></label>
                <div className="register-form-row"><label>Password<input required minLength="8" type="password" placeholder="At least 8 characters" /></label><label>Confirm password<input required minLength="8" type="password" placeholder="Repeat password" /></label></div>
                <label className="register-check"><input required type="checkbox" /> I agree to the Samarth terms and privacy policy.</label>
                <button type="submit" className="btn btn-apply register-submit">Create account <ArrowRight size={16} /></button>
              </form>
              <div className="auth-note"><ShieldCheck size={16} color="#138808" /><span>Your information is handled through secure government-grade controls.</span></div>
              <p className="auth-switch">Already registered? <button type="button" onClick={() => navigate('/login')}>Sign in</button></p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Register;