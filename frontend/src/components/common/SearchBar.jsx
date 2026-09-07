import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = [],
  placeholder = "Search by keyword, title, or domain..."
}) => {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', width: '100%', marginBottom: '1.5rem' }}>
      <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
        <Search
          size={18}
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '0.75rem 2.5rem 0.75rem 2.5rem',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            fontSize: '0.9rem',
            outline: 'none',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px' }}>
          <Filter size={16} style={{ color: '#64748B' }} />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              fontSize: '0.9rem',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              color: '#1E293B',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Domains & Sectors</option>
            {categories.map((cat) => (
              <option key={cat.id || cat} value={cat.id || cat}>
                {cat.name || cat}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
