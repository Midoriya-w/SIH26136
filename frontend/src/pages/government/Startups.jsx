import React, { useState } from 'react';
import GovernmentLayout from '../../layouts/GovernmentLayout';
import { MOCK_STARTUPS, DOMAIN_CATEGORIES } from '../../data/mockData';
import GovernmentStartupCard from '../../components/government/StartupCard';
import SearchBar from '../../components/common/SearchBar';

const GovernmentStartups = ({ currentUser, onRoleChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredStartups = MOCK_STARTUPS.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.dpiitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'all' || st.domain === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <GovernmentLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginBottom: '0.25rem' }}>
          Maharashtra DPIIT Registered Startup Directory
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
          Discover innovative startups for direct pilot shortlisting, technology demonstration, or procurement.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={DOMAIN_CATEGORIES}
        placeholder="Search by startup name, DPIIT number, city, or tech focus..."
      />

      <div className="cards-grid">
        {filteredStartups.map((st) => (
          <GovernmentStartupCard
            key={st.id}
            startup={st}
            onSelectForPilot={(s) => alert(`Startup ${s.name} shortlisted for pilot consideration.`)}
          />
        ))}
      </div>
    </GovernmentLayout>
  );
};

export default GovernmentStartups;
