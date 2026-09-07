import React from 'react';
import { Calendar, DollarSign, Building, ArrowRight, Users } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

const StartupChallengeCard = ({ challenge, onApply, onView }) => {
  return (
    <div className="ui-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B' }}>{challenge.id}</span>
          <StatusBadge status={challenge.status} />
        </div>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0B2545', lineHeight: 1.3 }}>
          {challenge.title}
        </h3>

        <div style={{ fontSize: '0.8rem', color: '#0056B3', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Building size={14} />
          {challenge.department}
        </div>

        <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {challenge.problemStatement}
        </p>

        {/* Highlighted Meta Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Pilot Funding</span>
            <strong style={{ fontSize: '0.85rem', color: '#138808' }}>{challenge.budget}</strong>
          </div>

          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Timeline</span>
            <strong style={{ fontSize: '0.85rem', color: '#0B2545' }}>{challenge.pilotTimeline}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#64748B', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} color="#E65100" />
            Deadline: {challenge.deadline}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={13} color="#0056B3" />
            {challenge.applicantCount} Proposals
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Button variant="outline" size="sm" onClick={() => onView(challenge)} style={{ flex: 1 }}>
          View Details
        </Button>
        <Button variant="primary" size="sm" onClick={() => onApply(challenge)} icon={ArrowRight} style={{ flex: 1 }}>
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default StartupChallengeCard;
