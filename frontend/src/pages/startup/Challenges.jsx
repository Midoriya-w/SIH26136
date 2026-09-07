import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StartupLayout from '../../layouts/StartupLayout';
import { MOCK_CHALLENGES, DOMAIN_CATEGORIES } from '../../data/mockData';
import StartupChallengeCard from '../../components/startup/ChallengeCard';
import SearchBar from '../../components/common/SearchBar';

const StartupChallenges = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialDomain = searchParams.get('domain') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialDomain);

  const filteredChallenges = MOCK_CHALLENGES.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.problemStatement.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'all' || ch.domain === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <StartupLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginBottom: '0.25rem' }}>
          Government Department Challenges
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
          Browse open problem statements issued by Maharashtra state departments and apply for pilot funding.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={DOMAIN_CATEGORIES}
        placeholder="Search by challenge keyword, department, or location..."
      />

      <div className="cards-grid">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((ch) => (
            <StartupChallengeCard
              key={ch.id}
              challenge={ch}
              onView={(c) => navigate(`/startup/challenges/${c.id}`)}
              onApply={(c) => navigate(`/startup/challenges/${c.id}`)}
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', background: '#FFFFFF', padding: '3rem', textAlign: 'center', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#0B2545', marginBottom: '0.5rem' }}>No Challenges Found</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Try adjusting your search criteria or domain filter.</p>
          </div>
        )}
      </div>
    </StartupLayout>
  );
};

export default StartupChallenges;
