// // authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Thunk for user registration
// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async ({ username, password }) => {
//     const response = await axios.post(
//       'https://connections-api.herokuapp.com/users/register',
//       {
//         username,
//         password,
//       }
//     );
//     return response.data;
//   }
// );

// // Thunk for user login
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async ({ username, password }) => {
//     const response = await axios.post(
//       'https://connections-api.herokuapp.com/users/login',
//       {
//         username,
//         password,
//       }
//     );
//     return response.data;
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     logout(state) {
//       state.token = null;
//       state.isAuthenticated = false;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         console.error(action.error.message);
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         console.error(action.error.message);
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//  Thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const response = await axios.post(
      'https://connections-api.herokuapp.com/users/signup',
      {
        name,
        email,
        password,
      }
    );
    return response.data;
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      axios.defaults.headers.common.Authorization = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const loginUser = userData => async dispatch => {
  try {
    dispatch(loginStart());
    const response = await axios.post(
      'https://connections-api.herokuapp.com/users/login',
      userData
    );
    dispatch(loginSuccess(response.data));
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
  } catch (error) {
    dispatch(loginFailure('Failed to login user'));
  }
};

export const logoutUser = () => dispatch => {
  dispatch(logout());
};

export default authSlice.reducer;
