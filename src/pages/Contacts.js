import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/contacts/operations';
import {
  addContact,
  deleteContact,
  setFilter,
} from '../redux/contacts/operations';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import { Helmet } from 'react-helmet';
import {
  selectLoading,
  selectFilter,
  selectContacts,
} from '../redux/contacts/selectors';

export default function Contacts() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectLoading);

  useEffect(() => {
    // Fetch contacts from the backend API when the application starts or reloads
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = contact => {
    dispatch(addContact(contact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Phonebook</title>
      </Helmet>
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <ContactList
        contacts={filteredContacts}
        deleteContact={handleDeleteContact}
      />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
    </>
  );
}
