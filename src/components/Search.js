import React from 'react';
import { Input } from 'antd';

export default function Search({ newSearch, setNewSearch }) {
  return (
    <div className="input-container">
      <Input
        type="text"
        placeholder="Search by text or status..."
        value={newSearch}
        onChange={(e) => setNewSearch(e.target.value)}
      />
    </div>
  );
}
