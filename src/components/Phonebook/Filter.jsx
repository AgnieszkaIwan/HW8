import React from 'react';

const Filter = ({ filter, setFilter }) => {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      value={filter}
      onChange={e => setFilter(e.target.value)}
    />
  );
};

export default Filter;
