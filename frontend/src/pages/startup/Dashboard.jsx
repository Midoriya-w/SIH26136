import React from 'react';
import { useNavigate } from 'react-router-dom';
import StartupLayout from '../../layouts/StartupLayout';
import { MOCK_CHALLENGES, MOCK_APPLICATIONS } from '../../data/mockData';
import StartupChallengeCard from '../../components/startup/ChallengeCard';
import ApplicationCard from '../../components/startup/ApplicationCard';
import { Rocket, FileText, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

const StartupDashboard = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();

  return (
    <StartupLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      {/* Header Banner */}
      <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0056B3', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
            DPIIT Recognition: {currentUser?.dpiit || 'DPIIT94821'}
          </span>
          <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginTop: '4px' }}>
            Welcome back, {currentUser?.name || 'AgriVision Technologies'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Track active government challenge applications, submit proposals, and monitor pilot allocation.
          </p>
        </div>

        <Button variant="primary" icon={Rocket} onClick={() => navigate('/startup/challenges')}>
          Explore Open Challenges
        </Button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="metric-card">
          <div className="metric-icon blue"><FileText size={24} /></div>
          <div>
            <div className="metric-value">3</div>
            <div className="metric-label">Applications Submitted</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple"><CheckCircle2 size={24} /></div>
          <div>
            <div className="metric-value">1</div>
            <div className="metric-label">Shortlisted for Pilot</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green"><Award size={24} /></div>
          <div>
            <div className="metric-value">₹ 1.15 Cr</div>
            <div className="metric-label">Pilot Grants Approved</div>
          </div>
        </div>
      </div>

      {/* Active Applications Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#0B2545' }}>My Submitted Proposals</h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Real-time evaluation status across randomized domain experts</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/startup/applications')}>
            View All Applications
          </Button>
        </div>

        <div className="cards-grid">
          {MOCK_APPLICATIONS.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onViewProgress={(a) => navigate('/startup/applications')}
            />
          ))}
        </div>
      </div>

      {/* Recommended Challenges Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#0B2545' }}>Recommended Government Challenges</h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Matched with your startup domain and expertise</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/startup/challenges')}>
            Browse All ({MOCK_CHALLENGES.length})
          </Button>
        </div>

        <div className="cards-grid">
          {MOCK_CHALLENGES.slice(0, 3).map((ch) => (
            <StartupChallengeCard
              key={ch.id}
              challenge={ch}
              onView={(c) => navigate(`/startup/challenges/${c.id}`)}
              onApply={(c) => navigate(`/startup/challenges/${c.id}`)}
            />
          ))}
        </div>
      </div>
    </StartupLayout>
  );
};

export default StartupDashboard;
