import React from 'react';
import { Users, Calendar, Award, Edit3, ArrowUpRight } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

const GovernmentChallengeCard = ({ challenge, onViewApplications, onManage }) => {
  return (
    <div className="ui-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0056B3' }}>{challenge.id}</span>
          <StatusBadge status={challenge.status} />
        </div>

        <h3 style={{ fontSize: '1.1rem', color: '#0B2545', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {challenge.title}
        </h3>

        <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem' }}>
          Target Districts: <strong style={{ color: '#0B2545' }}>{challenge.targetDistricts.join(', ')}</strong>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#F8FAFC', padding: '0.75rem', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Applicants</div>
            <strong style={{ fontSize: '1.1rem', color: '#0B2545' }}>{challenge.applicantCount}</strong>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Evaluators</div>
            <strong style={{ fontSize: '1.1rem', color: '#7C3AED' }}>{challenge.evaluatorsAssigned}</strong>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Budget</div>
            <strong style={{ fontSize: '0.85rem', color: '#138808' }}>{challenge.budget}</strong>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Button variant="outline" size="sm" onClick={() => onManage && onManage(challenge)} icon={Edit3} style={{ flex: 1 }}>
          Edit Specs
        </Button>
        <Button variant="navy" size="sm" onClick={() => onViewApplications(challenge)} icon={ArrowUpRight} style={{ flex: 1 }}>
          View Proposals ({challenge.applicantCount})
        </Button>
      </div>
    </div>
  );
};

export default GovernmentChallengeCard;
