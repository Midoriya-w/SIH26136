import React from 'react';
import { Building, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import Button from '../common/Button';

const GovernmentStartupCard = ({ startup, onSelectForPilot }) => {
  return (
    <div className="ui-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '4px' }}>
              {startup.dpiitNumber}
            </span>
            <h3 style={{ fontSize: '1.05rem', color: '#0B2545', marginTop: '6px' }}>{startup.name}</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{startup.location}</span>
        </div>

        <p style={{ fontSize: '0.825rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.4 }}>
          {startup.summary}
        </p>

        <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.75rem', color: '#475569', marginBottom: '1.25rem' }}>
          <strong>Proven Past Deployment:</strong> {startup.pastWork}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <a href={startup.website} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <Button variant="outline" size="sm" icon={ExternalLink}>
            Details
          </Button>
        </a>
        <Button variant="success" size="sm" onClick={() => onSelectForPilot(startup)} icon={CheckCircle} style={{ flex: 1 }}>
          Shortlist for Pilot
        </Button>
      </div>
    </div>
  );
};

export default GovernmentStartupCard;
