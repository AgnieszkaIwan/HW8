import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const addContact = createAsyncThunk('contacts/add', async contact => {
  try {
    const response = await axios.post(
      'https://64c24ae1eb7fd5d6ebcf925f.mockapi.io/contacts',
      contact
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to add contact');
  }
});
export const deleteContact = createAsyncThunk('contacts/delete', async id => {
  try {
    await axios.delete(
      `https://64c24ae1eb7fd5d6ebcf925f.mockapi.io/contacts/${id}`
    );
    return id;
  } catch (error) {
    throw new Error('Failed to delete contact');
  }
});

export const setFilter = createAction('contacts/setFilter');

// const loadContactsFromLocalStorage = () => {
//   try {
//     const contactsData = localStorage.getItem('contacts');
//     return contactsData ? JSON.parse(contactsData) : [];
//   } catch (error) {
//     console.error('Error loading contacts from local storage:', error);
//     return [];
//   }
// };

export const fetchContacts = createAsyncThunk('contacts/fetch', async () => {
  const response = await axios.get(
    'https://64c24ae1eb7fd5d6ebcf925f.mockapi.io/contacts'
  );
  return response.data;
});

const initialState = {
  contacts: [],
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
      console.error(action.error.message);
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
      console.error(action.error.message);
    });
  builder.addCase(setFilter, (state, action) => {
    state.filter = action.payload;
  });
  builder.addCase(fetchContacts.fulfilled, (state, action) => {
    state.contacts = action.payload;
  });
});

export default contactsReducer;
