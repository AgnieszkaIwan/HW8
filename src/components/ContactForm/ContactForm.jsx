import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsSlice';
import { nanoid } from 'nanoid';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import styles from './ContactForm.module.css';
import classNames from 'classnames';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    if (checkIfContactExists(name)) {
      NotificationManager.error('Contact already exists!', 'Error');
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    try {
      await dispatch(addContact(contact));
      setName('');
      setNumber('');
    } catch (error) {}
  };

  const checkIfContactExists = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        className={classNames(styles.input)}
        type="text"
        name="name"
        pattern="^[A-Za-z.'\- ]+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className={classNames(styles.input)}
        type="tel"
        name="number"
        pattern="^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
      <button className={classNames(styles.button)} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
