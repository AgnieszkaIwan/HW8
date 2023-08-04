import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  setFilter,
  fetchContacts,
} from './operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(addContact.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
      state.status = 'succeeded';
    });
    builder.addCase(addContact.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(deleteContact.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
  },
});

export default contactsSlice.reducer;
