import React from 'react';

export default function Search({ newSearch, setNewSearch }) {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Search by text or status..."
        value={newSearch}
        onChange={(e) => setNewSearch(e.target.value)}
      />
    </div>
  );
}
