import React, { useState } from 'react';
import StartupLayout from '../../layouts/StartupLayout';
import { MOCK_STARTUPS } from '../../data/mockData';
import { Building, MapPin, Award, Upload, Save, CheckCircle2, FileCheck } from 'lucide-react';
import Button from '../../components/common/Button';

const StartupProfile = ({ currentUser, onRoleChange }) => {
  const [profile, setProfile] = useState({
    name: 'AgriVision Technologies Pvt Ltd',
    dpiitNumber: 'DPIIT94821',
    foundedYear: 2022,
    location: 'Pune, Maharashtra',
    founder: 'Dr. Rajesh Deshmukh',
    domain: 'Agriculture & AgriTech',
    stage: 'Growth Stage',
    teamSize: 18,
    website: 'https://agrivision.example.in',
    summary: 'Building offline-first AI camera diagnostics for Indian smallholder farmers.',
    pastWork: 'Deployed crop protection app used by 45,000+ farmers across Marathwada region.',
    certifications: 'ISO 9001:2015, DPIIT Recognised, MSINS Grant Winner 2024'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <StartupLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
              Verified DPIIT Entity
            </span>
            <h1 style={{ fontSize: '1.5rem', color: '#0B2545', marginTop: '4px' }}>Startup Official Profile</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>This information is shared with government evaluation committees.</p>
          </div>

          {isSaved && (
            <div style={{ background: '#DCFCE7', color: '#166534', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> Profile Saved!
            </div>
          )}
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>Startup Legal Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>DPIIT Recognition Number</label>
              <input
                type="text"
                value={profile.dpiitNumber}
                onChange={(e) => setProfile({ ...profile, dpiitNumber: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>Headquarters Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>Primary Domain Sector</label>
              <input
                type="text"
                value={profile.domain}
                onChange={(e) => setProfile({ ...profile, domain: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>Core Innovation & Solution Brief</label>
            <textarea
              rows={3}
              value={profile.summary}
              onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.4rem' }}>Past Government / Enterprise Pilot Record</label>
            <textarea
              rows={2}
              value={profile.pastWork}
              onChange={(e) => setProfile({ ...profile, pastWork: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <FileCheck size={28} color="#0056B3" style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B2545' }}>Master Pitch Deck & DPIIT Certificate Uploaded</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>agrivision_master_presentation_2026.pdf (4.2 MB)</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="navy" type="submit" icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </StartupLayout>
  );
};

export default StartupProfile;
