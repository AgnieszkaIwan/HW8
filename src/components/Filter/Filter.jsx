import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">Filter contacts by name:</label>
      <input
        type="text"
        id="filter"
        name="filter"
        value={filter}
        onChange={onFilterChange}
        placeholder="Enter name"
      />
    </div>
  );
};

export default Filter;
