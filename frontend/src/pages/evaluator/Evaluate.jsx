import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EvaluatorLayout from '../../layouts/EvaluatorLayout';
import { MOCK_APPLICATIONS } from '../../data/mockData';
import EvaluationForm from '../../components/evaluator/EvaluationForm';
import { ArrowLeft, CheckCircle2, FileText, ExternalLink, Download } from 'lucide-react';
import Button from '../../components/common/Button';

const EvaluatePage = ({ currentUser, onRoleChange }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const application = MOCK_APPLICATIONS.find(a => a.id === id) || MOCK_APPLICATIONS[0];
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitEvaluation = (data) => {
    setSubmittedSuccess(true);
    setTimeout(() => {
      navigate('/evaluator/dashboard');
    }, 1800);
  };

  return (
    <EvaluatorLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <button
        onClick={() => navigate('/evaluator/assigned')}
        style={{ background: 'none', border: 'none', color: '#0056B3', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '1rem' }}
      >
        <ArrowLeft size={16} /> Back to Assigned Queue
      </button>

      {submittedSuccess ? (
        <div style={{ background: '#FFFFFF', padding: '3rem', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center', maxWidth: '600px', margin: '2rem auto' }}>
          <CheckCircle2 size={54} color="#138808" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#0B2545', marginBottom: '0.5rem' }}>Evaluation Recorded & Signed</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Your evaluation report for <strong>{application.startupName}</strong> has been transmitted to the state innovation committee.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Startup Proposal Context */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ borderBottom: '1px solid #E2E8F0', pb: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0056B3', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
                Application Proposal #{application.id}
              </span>
              <h2 style={{ fontSize: '1.3rem', color: '#0B2545', marginTop: '6px' }}>{application.startupName}</h2>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Submitted: {application.submissionDate}</div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#0B2545', marginBottom: '0.4rem' }}>Challenge Problem</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{application.challengeTitle}</p>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#0B2545', marginBottom: '0.4rem' }}>Executive Proposal Summary</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{application.proposalSummary}</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: '#64748B' }}>Pilot Funding Requested:</span>
                <strong style={{ color: '#138808' }}>{application.budgetRequested}</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#0B2545', marginBottom: '0.75rem' }}>Attached Documents</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ background: '#F1F5F9', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0B2545', fontWeight: 600 }}>
                    <FileText size={14} color="#0056B3" /> Technical_Architecture_PitchDeck.pdf
                  </span>
                  <a href="#" style={{ color: '#0056B3', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Download size={12} /> View PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Evaluation Form */}
          <div>
            <EvaluationForm
              application={application}
              onSubmitEvaluation={handleSubmitEvaluation}
              onCancel={() => navigate('/evaluator/assigned')}
            />
          </div>

        </div>
      )}
    </EvaluatorLayout>
  );
};

export default EvaluatePage;
