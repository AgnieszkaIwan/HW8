import React from 'react';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, filter, deleteContact }) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = id => {
    deleteContact(id);
  };

  return (
    <ul className={styles.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={styles.listItem}>
          {contact.name} - {contact.number}
          <button
            onClick={() => handleDelete(contact.id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
