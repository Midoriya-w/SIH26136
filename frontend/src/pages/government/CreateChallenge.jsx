import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GovernmentLayout from '../../layouts/GovernmentLayout';
import { DOMAIN_CATEGORIES } from '../../data/mockData';
import Button from '../../components/common/Button';
import { PlusCircle, CheckCircle2, ArrowLeft, Send } from 'lucide-react';

const CreateChallenge = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    department: currentUser?.department || 'Department of Skills, Employment, Entrepreneurship & Innovation',
    domain: 'agriculture',
    budget: '₹ 50,00,000',
    pilotTimeline: '6 Months',
    deadline: '2026-11-30',
    targetDistricts: 'Yavatmal, Nanded, Kolhapur',
    problemStatement: '',
    expectedOutcome: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/government/challenges');
    }, 1500);
  };

  return (
    <GovernmentLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <button
        onClick={() => navigate('/government/challenges')}
        style={{ background: 'none', border: 'none', color: '#0056B3', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '1rem' }}
      >
        <ArrowLeft size={16} /> Back to Challenges
      </button>

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          
          <div style={{ borderBottom: '1px solid #E2E8F0', pb: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#138808', background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
              State Innovation Procurement Engine
            </span>
            <h1 style={{ fontSize: '1.5rem', color: '#0B2545', marginTop: '4px' }}>Post New Government Challenge</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Define the problem statement, target pilot districts, and budget for startup solution submission.
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <CheckCircle2 size={54} color="#138808" style={{ margin: '0 auto 1rem auto' }} />
              <h2 style={{ fontSize: '1.5rem', color: '#0B2545' }}>Challenge Successfully Published!</h2>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Your challenge has been assigned ID <strong>CH-2026-006</strong> and is now open for startup applications across Maharashtra.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                  Challenge Title / Problem Summary
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI-Based Drone Surveying for Urban Flood Mitigation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                    Issuing Department
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                    Target Domain Sector
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                  >
                    {DOMAIN_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                    Allocated Pilot Funding Budget
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                    Pilot Timeline
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pilotTimeline}
                    onChange={(e) => setFormData({ ...formData, pilotTimeline: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                  Target Districts / Deployment Scope
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nashik, Nanded, Statewide"
                  value={formData.targetDistricts}
                  onChange={(e) => setFormData({ ...formData, targetDistricts: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                  Detailed Problem Statement & Pain Points
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Elaborate on current operational challenges, manual bottlenecks, or citizen issues..."
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>
                  Expected Solution Outcomes & Quantifiable Metrics
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Reduce grievance processing turnaround time from 14 days to 48 hours..."
                  value={formData.expectedOutcome}
                  onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <Button variant="outline" type="button" onClick={() => navigate('/government/challenges')}>
                  Cancel
                </Button>
                <Button variant="saffron" type="submit" icon={Send}>
                  Publish State Challenge
                </Button>
              </div>
            </form>
          )}

        </div>
      </div>
    </GovernmentLayout>
  );
};

export default CreateChallenge;
