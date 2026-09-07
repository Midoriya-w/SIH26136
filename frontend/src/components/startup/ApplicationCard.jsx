import React from 'react';
import { FileText, Calendar, CheckCircle2, Clock, Award, Users } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

const ApplicationCard = ({ application, onViewProgress }) => {
  return (
    <div className="ui-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0056B3', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
            {application.id}
          </span>
          <StatusBadge status={application.status} />
        </div>

        <h3 style={{ fontSize: '1.05rem', color: '#0B2545', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {application.challengeTitle}
        </h3>

        <p style={{ fontSize: '0.825rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.4 }}>
          {application.proposalSummary}
        </p>

        {/* Multi-expert Evaluator Progress Indicators */}
        <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '0.875rem', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0B2545', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={14} color="#7C3AED" /> Randomized Evaluators Evaluation
            </span>
            {application.averageScore && (
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#138808' }}>
                Score: {application.averageScore}/100
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {application.evaluators.map((ev, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                <span style={{ color: '#475569' }}>{ev.role} ({ev.name.split(' ')[0]})</span>
                {ev.status === 'Completed' ? (
                  <span style={{ color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <CheckCircle2 size={12} /> {ev.score ? `${ev.score} pts` : 'Scored'}
                  </span>
                ) : (
                  <span style={{ color: '#D97706', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Clock size={12} /> In Review
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={13} /> Submitted: {application.submissionDate}
        </span>
        <Button variant="outline" size="sm" onClick={() => onViewProgress(application)}>
          Track Status & Score
        </Button>
      </div>
    </div>
  );
};

export default ApplicationCard;
