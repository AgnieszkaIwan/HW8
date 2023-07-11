import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import styles from './ContactForm.module.css';
import classNames from 'classnames';

const ContactForm = ({ addContact, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const checkIfContactExists = name => {
      return contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );
    };

    if (checkIfContactExists(name)) {
      NotificationManager.error('Contact already exists!', 'Error');
    }
  }, [contacts, name]);

  const handleSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    addContact(contact);
    setName('');
    setNumber('');
  };

  // checkIfContactExists = name => {
  //   return contacts.some(
  //     contact => contact.name.toLowerCase() === name.toLowerCase()
  //   );
  // };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        className={classNames(styles.input)}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        className={classNames(styles.input)}
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
      <button type="submit" className={classNames(styles.button)}>
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
