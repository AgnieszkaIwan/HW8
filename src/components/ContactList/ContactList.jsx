import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../contactsSlice';
import styles from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = async id => {
    try {
      await dispatch(deleteContact(id));
    } catch (error) {}
  };

  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <span>{contact.name} </span>
          <span>{contact.number}</span>
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
