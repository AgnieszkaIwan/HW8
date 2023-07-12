import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const updateContactsInLocalStorage = updatedContacts => {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const addContact = contact => {
    if (checkIfContactExists(contact.name)) {
      NotificationManager.error('Contact already exists!', 'Error');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts, newContact];
      updateContactsInLocalStorage(updatedContacts);
      return updatedContacts;
    });
    setName('');
    setNumber('');
  };

  const deleteContact = id => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(contact => contact.id !== id);
      updateContactsInLocalStorage(updatedContacts);
      return updatedContacts;
    });
  };

  const checkIfContactExists = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        addContact={addContact}
        contacts={contacts}
        name={name}
        onNameChange={setName}
        number={number}
        onNumberChange={setNumber}
      />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />

      <NotificationContainer />
    </div>
  );
};

export default App;
