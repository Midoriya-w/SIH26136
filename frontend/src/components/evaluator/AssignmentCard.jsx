import React from 'react';
import { Clock, CheckCircle2, FileText, ArrowRight, Shield } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

const AssignmentCard = ({ application, onEvaluate }) => {
  const userEval = application.evaluators.find(e => e.id === 'EVAL-01') || application.evaluators[0];
  const isDone = userEval?.status === 'Completed';

  return (
    <div className="ui-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#F3E8FF', color: '#7C3AED', padding: '2px 8px', borderRadius: '4px' }}>
            {userEval?.role || 'Domain Expert'}
          </span>
          {isDone ? (
            <span className="status-badge completed">
              <span className="badge-dot"></span> Evaluated ({userEval.score} pts)
            </span>
          ) : (
            <span className="status-badge open">
              <span className="badge-dot"></span> Pending Evaluation
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '1.05rem', color: '#0B2545', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {application.startupName}
        </h3>

        <div style={{ fontSize: '0.8rem', color: '#0056B3', fontWeight: 600, marginBottom: '0.75rem' }}>
          Challenge: {application.challengeTitle}
        </div>

        <p style={{ fontSize: '0.825rem', color: '#475569', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {application.proposalSummary}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748B', background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
          <Shield size={14} color="#059669" />
          <span>Randomly Assigned • No Conflict Declared</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
        {isDone ? (
          <Button variant="outline" size="sm" onClick={() => onEvaluate(application)} style={{ width: '100%' }}>
            View Submitted Feedback ({userEval.score}/100)
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={() => onEvaluate(application)} icon={ArrowRight} style={{ width: '100%' }}>
            Evaluate Proposal
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
