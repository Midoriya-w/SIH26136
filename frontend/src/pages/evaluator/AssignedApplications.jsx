import React from 'react';
import { useNavigate } from 'react-router-dom';
import EvaluatorLayout from '../../layouts/EvaluatorLayout';
import { MOCK_APPLICATIONS } from '../../data/mockData';
import AssignmentCard from '../../components/evaluator/AssignmentCard';

const AssignedApplications = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();

  return (
    <EvaluatorLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginBottom: '0.25rem' }}>
          Assigned Proposals Queue
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
          Independently review proposals, score technical feasibility, and submit recommendations.
        </p>
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
    </EvaluatorLayout>
  );
};

export default AssignedApplications;
