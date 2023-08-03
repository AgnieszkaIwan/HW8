import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addContact = createAsyncThunk('contacts/add', async contact => {
  try {
    const response = await axios.post('/contacts', contact);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add contact');
  }
});
export const deleteContact = createAsyncThunk('contacts/delete', async id => {
  try {
    await axios.delete(`/contacts/${id}`);
    return id;
  } catch (error) {
    throw new Error('Failed to delete contact');
  }
});

export const setFilter = createAction('contacts/setFilter');

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, { getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.get('/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
