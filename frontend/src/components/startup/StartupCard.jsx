import React from 'react';
import { Building2, MapPin, Award, ExternalLink } from 'lucide-react';
import Button from '../common/Button';

const StartupCard = ({ startup, onViewDetails }) => {
  return (
    <div className="ui-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0056B3', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
              {startup.dpiitNumber || 'DPIIT Recognised'}
            </span>
            <h3 style={{ fontSize: '1.1rem', marginTop: '6px', color: '#0B2545' }}>{startup.name}</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Est. {startup.foundedYear}</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.4 }}>
          {startup.summary}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: '#64748B', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color="#E65100" />
            <span>{startup.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={14} color="#0056B3" />
            <span>{startup.domainLabel || startup.domain} • {startup.stage}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={14} color="#138808" />
            <span>{startup.pastWork}</span>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a
          href={startup.website}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', color: '#0056B3' }}
        >
          Website <ExternalLink size={12} />
        </a>
        <Button variant="outline" size="sm" onClick={() => onViewDetails && onViewDetails(startup)}>
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default StartupCard;
