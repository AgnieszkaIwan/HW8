import React from 'react';
import styles from './Filter.module.css';

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search contacts..."
      className={styles.input}
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default Filter;
