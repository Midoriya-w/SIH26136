import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StartupLayout from '../../layouts/StartupLayout';
import { MOCK_CHALLENGES } from '../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import {
  Building,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  Upload,
  CheckCircle2,
  ArrowLeft,
  Send,
  Layers,
  Clock
} from 'lucide-react';

const ChallengeDetails = ({ currentUser, onRoleChange }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = MOCK_CHALLENGES.find((c) => c.id === id) || MOCK_CHALLENGES[0];

  const [showModal, setShowModal] = useState(false);
  const [proposalSummary, setProposalSummary] = useState('');
  const [budgetRequested, setBudgetRequested] = useState(challenge.budget);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      navigate('/startup/applications');
    }, 1500);
  };

  return (
    <StartupLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <button
        onClick={() => navigate('/startup/challenges')}
        style={{ background: 'none', border: 'none', color: '#0056B3', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '1rem' }}
      >
        <ArrowLeft size={16} /> Back to Challenges
      </button>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Title Header */}
        <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0056B3', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
              {challenge.id}
            </span>
            <StatusBadge status={challenge.status} />
          </div>

          <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            {challenge.title}
          </h1>

          <div style={{ fontSize: '0.9rem', color: '#0056B3', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem' }}>
            <Building size={16} /> {challenge.department}
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Max Pilot Grant</span>
              <strong style={{ fontSize: '1.1rem', color: '#138808' }}>{challenge.budget}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Target Districts</span>
              <strong style={{ fontSize: '0.9rem', color: '#0B2545' }}>{challenge.targetDistricts.join(', ')}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Pilot Duration</span>
              <strong style={{ fontSize: '0.9rem', color: '#0B2545' }}>{challenge.pilotTimeline}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Submission Deadline</span>
              <strong style={{ fontSize: '0.9rem', color: '#E65100' }}>{challenge.deadline}</strong>
            </div>
          </div>
        </div>

        {/* Challenge Specs Section */}
        <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#0B2545', marginBottom: '0.5rem' }}>Problem Statement & Background</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{challenge.problemStatement}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#0B2545', marginBottom: '0.5rem' }}>Expected Solution Outcomes & Deliverables</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{challenge.expectedOutcome}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#0B2545', marginBottom: '0.5rem' }}>Eligibility & Evaluation Criteria</h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>DPIIT Recognized Startup registered in India (Preference for Maharashtra domiciled startups).</li>
              <li>Technology Readiness Level (TRL 5+) capable of immediate field deployment.</li>
              <li>Evaluated across 6 parameters: Technical Feasibility (20%), Innovation (20%), Impact (20%), Scalability (15%), Cost (15%), Readiness (10%).</li>
              <li>Selected startup receives direct work order and 100% pilot grant disbursement upon milestones.</li>
            </ul>
          </div>
        </div>

        {/* Apply CTA Banner */}
        <div style={{ background: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)', padding: '1.75rem', borderRadius: '16px', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '4px' }}>Ready to deploy your innovation with Government of Maharashtra?</h3>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Submit your solution proposal for randomized multi-expert evaluation.</p>
          </div>

          <Button variant="saffron" size="lg" icon={Send} onClick={() => setShowModal(true)}>
            Apply for this Challenge
          </Button>
        </div>

      </div>

      {/* Interactive Application Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle2 size={54} color="#138808" style={{ margin: '0 auto 1rem auto' }} />
                <h2 style={{ fontSize: '1.5rem', color: '#0B2545', marginBottom: '0.5rem' }}>Proposal Successfully Submitted!</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Your application has been assigned ID <strong>APP-2026-104</strong> and allocated for randomized 3-expert evaluation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', pb: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#0B2545' }}>Submit Proposal for {challenge.id}</h3>
                  <button type="button" onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                    Executive Technical Summary
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={proposalSummary}
                    onChange={(e) => setProposalSummary(e.target.value)}
                    placeholder="Describe your technical solution, field deployment methodology, and how you will meet target deliverables..."
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                    Estimated Pilot Funding Requested
                  </label>
                  <input
                    type="text"
                    required
                    value={budgetRequested}
                    onChange={(e) => setBudgetRequested(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ background: '#F8FAFC', border: '1px dashed #0056B3', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', textAlign: 'center' }}>
                  <Upload size={24} color="#0056B3" style={{ marginBottom: '4px' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0B2545' }}>Upload Technical Pitch & Financial Breakdown</div>
                  <div style={{ fontSize: '0.725rem', color: '#64748B' }}>Accepted formats: PDF up to 25MB</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <Button variant="outline" type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" icon={Send}>
                    Submit Official Proposal
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </StartupLayout>
  );
};

export default ChallengeDetails;
