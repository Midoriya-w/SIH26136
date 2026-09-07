import React from 'react';
import Button from './Button';

const RoleSelectionModal = ({ open, onClose, onSelect }) => {
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 600 }}>
      <div style={{ width: 760, maxWidth: '95%', background: '#fff', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: 'var(--primary-navy)' }}>Welcome to MIPP — Tell us who you are</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 18 }}>✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
          <div style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 16 }}>
            <h4 style={{ marginTop: 0 }}>Government Department</h4>
            <p style={{ color: 'var(--text-muted)' }}>Post a real problem and find a startup partner to solve it.</p>
            <div style={{ marginTop: 12 }}>
              <Button variant="outline" onClick={() => onSelect('government')}>Post a Challenge</Button>
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 16 }}>
            <h4 style={{ marginTop: 0 }}>Startup / Innovator</h4>
            <p style={{ color: 'var(--text-muted)' }}>Browse live government challenges and apply with your solution.</p>
            <div style={{ marginTop: 12 }}>
              <Button variant="apply" onClick={() => onSelect('startup')}>Browse &amp; Apply</Button>
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 16 }}>
            <h4 style={{ marginTop: 0 }}>Evaluation Expert</h4>
            <p style={{ color: 'var(--text-muted)' }}>Review and score shortlisted applications for your assigned challenges.</p>
            <div style={{ marginTop: 12 }}>
              <Button variant="outline" onClick={() => onSelect('evaluator')}>Evaluator Login</Button>
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 16 }}>
            <h4 style={{ marginTop: 0 }}>Procurement / IT Cell</h4>
            <p style={{ color: 'var(--text-muted)' }}>Manage the platform, users, and compliance.</p>
            <div style={{ marginTop: 12 }}>
              <Button variant="apply" onClick={() => onSelect('government')}>Admin Login</Button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, textAlign: 'center', fontSize: '0.8rem', color: '#64748B' }}>
          Need help choosing? Write to procurement-support@maharashtra.gov.in
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
