import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, Award, FileSpreadsheet } from 'lucide-react';
import Button from '../common/Button';

const EvaluationStatus = ({ application, onApprovePilot, onReject }) => {
  if (!application) return null;

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7C3AED', background: '#F3E8FF', padding: '2px 8px', borderRadius: '4px' }}>
            Combined Multi-Expert Evaluation Report
          </span>
          <h2 style={{ fontSize: '1.25rem', color: '#0B2545', marginTop: '6px' }}>{application.startupName}</h2>
          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Challenge: {application.challengeTitle}</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Weighted Avg Score</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: application.averageScore >= 80 ? '#138808' : '#E65100' }}>
            {application.averageScore ? `${application.averageScore}/100` : 'In Review'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {application.evaluators.map((ev, i) => (
          <div key={i} style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0B2545', marginBottom: '4px' }}>{ev.role}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>{ev.name}</div>
            
            {ev.status === 'Completed' ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                  <span>Score Given:</span>
                  <span>{ev.score}/100</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '4px' }}>
                  Verdict: Recommended for Pilot
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> Evaluation Pending
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#EFF6FF', padding: '1rem', borderRadius: '10px', border: '1px solid #BFDBFE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={24} color="#0056B3" />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B2545' }}>Random Allocation Audit Clean</div>
            <div style={{ fontSize: '0.75rem', color: '#475569' }}>No conflict of interest recorded. 3 independent domain evaluations verified.</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" size="sm" onClick={() => onReject(application)}>
            Reject
          </Button>
          <Button variant="success" size="sm" icon={Award} onClick={() => onApprovePilot(application)}>
            Award Pilot Funding ({application.budgetRequested})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationStatus;
