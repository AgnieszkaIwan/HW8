import { createReducer } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  setFilter,
  fetchContacts,
} from './operations';

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
