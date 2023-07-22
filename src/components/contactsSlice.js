import { createAction, createReducer } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/add');
export const deleteContact = createAction('contacts/delete');
export const setFilter = createAction('contacts/setFilter');

const loadContactsFromLocalStorage = () => {
  try {
    const contactsData = localStorage.getItem('contacts');
    return contactsData ? JSON.parse(contactsData) : [];
  } catch (error) {
    console.error('Error loading contacts from local storage:', error);
    return [];
  }
};

const initialState = {
  contacts: loadContactsFromLocalStorage(),
  filter: '',
};

const saveContactsToLocalStorage = contacts => {
  try {
    const contactsData = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsData);
  } catch (error) {
    console.error('Error saving contacts to local storage:', error);
  }
};

const contactsReducer = createReducer(initialState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      state.contacts.push(action.payload);
      saveContactsToLocalStorage(state.contacts); // Save contacts to local storage
    })
    .addCase(deleteContact, (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
      saveContactsToLocalStorage(state.contacts); // Save contacts to local storage
    })
    .addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    });
});

export default contactsReducer;
