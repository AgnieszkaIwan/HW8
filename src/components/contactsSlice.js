import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const addContact = createAsyncThunk('contacts/add', async contact => {
  const response = await axios.post(
    'https://64c24ae1eb7fd5d6ebcf925f.mockapi.io/contacts',
    contact
  );
  return response.data;
});
export const deleteContact = createAsyncThunk('contacts/delete', async id => {
  await axios.delete(
    `https://64c24ae1eb7fd5d6ebcf925f.mockapi.io/contacts/${id}`
  );
  return id;
});
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

const contactsReducer = createReducer(initialState, builder => {
  builder
    .addCase(addContact.pending, state => {
      // Handle loading
    })
    .addCase(addContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
    })
    .addCase(addContact.rejected, (state, action) => {
      // Handle error
    })
    .addCase(deleteContact.pending, state => {
      // Handle loading
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    })
    .addCase(deleteContact.rejected, (state, action) => {
      // Handle error
    });
});

export default contactsReducer;
