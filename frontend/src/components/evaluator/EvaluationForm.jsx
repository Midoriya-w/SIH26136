import React, { useState } from 'react';
import { EVALUATION_CRITERIA } from '../../data/mockData';
import { CheckCircle2, ShieldAlert, Award, FileText, Send } from 'lucide-react';
import Button from '../common/Button';

const EvaluationForm = ({ application, onSubmitEvaluation, onCancel }) => {
  const [scores, setScores] = useState({
    tech: 8,
    innovation: 9,
    impact: 9,
    scalability: 8,
    cost: 7,
    readiness: 8
  });

  const [feedback, setFeedback] = useState(
    'The proposed solution demonstrates robust engineering feasibility and clear adaptation for rural local conditions in Maharashtra. Technical architecture is scalable.'
  );
  const [recommendation, setRecommendation] = useState('shortlist');
  const [noConflictConfirmed, setNoConflictConfirmed] = useState(true);

  // Calculate weighted score out of 100
  const totalWeightedScore = Object.keys(scores).reduce((acc, key) => {
    const criterion = EVALUATION_CRITERIA.find(c => c.id === key);
    if (!criterion) return acc;
    const itemScore = (scores[key] / 10) * criterion.weight;
    return acc + itemScore;
  }, 0);

  const handleScoreChange = (id, val) => {
    setScores(prev => ({ ...prev, [id]: Math.min(10, Math.max(1, Number(val))) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noConflictConfirmed) {
      alert('Please confirm the Conflict of Interest Declaration before submitting.');
      return;
    }
    onSubmitEvaluation({
      applicationId: application.id,
      scores,
      totalWeightedScore: Math.round(totalWeightedScore * 10) / 10,
      feedback,
      recommendation
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E2E8F0', pb: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7C3AED', background: '#F3E8FF', padding: '2px 8px', borderRadius: '4px' }}>
          Official Evaluation Scoring Form
        </span>
        <h2 style={{ fontSize: '1.35rem', color: '#0B2545', marginTop: '6px' }}>{application.startupName}</h2>
        <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Challenge: {application.challengeTitle}</div>
      </div>

      {/* Criteria Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {EVALUATION_CRITERIA.map((criterion) => {
          const scoreVal = scores[criterion.id] || 5;
          const weightedPoints = ((scoreVal / 10) * criterion.weight).toFixed(1);

          return (
            <div key={criterion.id} style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B2545' }}>
                  {criterion.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                  Weight: {criterion.weight}%
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={scoreVal}
                  onChange={(e) => handleScoreChange(criterion.id, e.target.value)}
                  style={{ flex: 1, accentColor: '#0056B3', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0056B3', minWidth: '24px', textAlign: 'right' }}>
                    {scoreVal}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>/10</span>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
                Contribution: +{weightedPoints} pts
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Live Weighted Score Box */}
      <div style={{ background: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)', color: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Calculated Total Score (Max 100)</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Weighted sum across all 6 predefined parameters</div>
        </div>
        <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#FF9933' }}>
          {totalWeightedScore.toFixed(1)} / 100
        </div>
      </div>

      {/* Qualitative Feedback */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.5rem' }}>
          Expert Feedback & Recommendations
        </label>
        <textarea
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Provide detailed technical rationale, potential operational risks, or suggested pilot refinements..."
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
        />
      </div>

      {/* Final Recommendation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.5rem' }}>
          Final Evaluator Recommendation
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[
            { id: 'shortlist', label: 'Recommend for Pilot', color: '#059669' },
            { id: 'revision', label: 'Needs Technical Clarification', color: '#D97706' },
            { id: 'reject', label: 'Not Recommended', color: '#DC2626' }
          ].map((rec) => (
            <button
              key={rec.id}
              type="button"
              onClick={() => setRecommendation(rec.id)}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: recommendation === rec.id ? `2px solid ${rec.color}` : '1px solid #CBD5E1',
                background: recommendation === rec.id ? '#F8FAFC' : '#FFFFFF',
                color: recommendation === rec.id ? rec.color : '#64748B',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {rec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conflict of Interest Declaration */}
      <div style={{ background: '#FFF8F0', border: '1px solid #FFE0B2', padding: '0.875rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
        <input
          type="checkbox"
          id="noConflict"
          checked={noConflictConfirmed}
          onChange={(e) => setNoConflictConfirmed(e.target.checked)}
          style={{ marginTop: '3px', accentColor: '#E65100' }}
        />
        <label htmlFor="noConflict" style={{ fontSize: '0.78rem', color: '#B78103', cursor: 'pointer', lineHeight: 1.4 }}>
          <strong>Conflict of Interest Declaration:</strong> I certify that I have no financial interest, commercial relationship, or personal affiliation with the applying startup entity.
        </label>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '0.75rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="navy" type="submit" icon={Send}>
          Submit Official Evaluation ({totalWeightedScore.toFixed(1)} Pts)
        </Button>
      </div>
    </form>
  );
};

export default EvaluationForm;
