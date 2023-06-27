import React, { useState } from 'react';
import ContactForm from './Phonebook/ContactForm';
import ContactList from './Phonebook/ContactList';
import Filter from './Phonebook/Filter';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    NotificationManager.success('Contact deleted successfully');
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter filter={filter} setFilter={setFilter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={deleteContact}
        />

        <NotificationContainer />
      </div>
    </div>
  );
};
