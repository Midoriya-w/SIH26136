import React from 'react';
import { useNavigate } from 'react-router-dom';
import GovernmentLayout from '../../layouts/GovernmentLayout';
import { MOCK_CHALLENGES } from '../../data/mockData';
import GovernmentChallengeCard from '../../components/government/ChallengeCard';
import Button from '../../components/common/Button';
import { PlusCircle } from 'lucide-react';

const GovernmentChallenges = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();

  return (
    <GovernmentLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginBottom: '0.25rem' }}>
            State Department Challenges
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Manage active problem statements, view incoming applicant numbers, and track evaluation progress.
          </p>
        </div>

        <Button variant="saffron" icon={PlusCircle} onClick={() => navigate('/government/create-challenge')}>
          Post New Challenge
        </Button>
      </div>

      <div className="cards-grid">
        {MOCK_CHALLENGES.map((ch) => (
          <GovernmentChallengeCard
            key={ch.id}
            challenge={ch}
            onViewApplications={(c) => navigate('/government/applications')}
          />
        ))}
      </div>
    </GovernmentLayout>
  );
};

export default GovernmentChallenges;
