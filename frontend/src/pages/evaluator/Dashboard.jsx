import React from 'react';
import { useNavigate } from 'react-router-dom';
import EvaluatorLayout from '../../layouts/EvaluatorLayout';
import { MOCK_APPLICATIONS } from '../../data/mockData';
import AssignmentCard from '../../components/evaluator/AssignmentCard';
import { UserCheck, CheckSquare, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

const EvaluatorDashboard = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();

  return (
    <EvaluatorLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      {/* Header Banner */}
      <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7C3AED', background: '#F3E8FF', padding: '2px 8px', borderRadius: '4px' }}>
            Official Domain Expert Evaluator
          </span>
          <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginTop: '4px' }}>
            Welcome, {currentUser?.name || 'Dr. S. K. Mahajan'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Randomized multi-expert evaluation queue for state startup challenges.
          </p>
        </div>

        <Button variant="navy" icon={CheckSquare} onClick={() => navigate('/evaluator/assigned')}>
          View Pending Queue
        </Button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="metric-card">
          <div className="metric-icon purple"><CheckSquare size={24} /></div>
          <div>
            <div className="metric-value">6</div>
            <div className="metric-label">Total Assigned Proposals</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green"><ShieldCheck size={24} /></div>
          <div>
            <div className="metric-value">5</div>
            <div className="metric-label">Completed Evaluations</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon orange"><Clock size={24} /></div>
          <div>
            <div className="metric-value">1</div>
            <div className="metric-label">Pending Action</div>
          </div>
        </div>
      </div>

      {/* Assigned Applications Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#0B2545' }}>Assigned Startup Applications</h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Randomly allocated by the Samarth allocation engine</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/evaluator/assigned')}>
            View All ({MOCK_APPLICATIONS.length})
          </Button>
        </div>

        <div className="cards-grid">
          {MOCK_APPLICATIONS.map((app) => (
            <AssignmentCard
              key={app.id}
              application={app}
              onEvaluate={(a) => navigate(`/evaluator/evaluate/${a.id}`)}
            />
          ))}
        </div>
      </div>
    </EvaluatorLayout>
  );
};

export default EvaluatorDashboard;
