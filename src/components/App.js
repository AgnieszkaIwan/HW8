// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   Route,
//   BrowserRouter as Router,
//   Navigate,
//   Routes,
// } from 'react-router-dom';
// import { fetchContacts } from '../redux/contacts/contactsSlice';
// import { loginUser, registerUser, logout } from '../redux/authSlice';
// import {
//   addContact,
//   deleteContact,
//   setFilter,
// } from '../redux/contacts/contactsSlice';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
// import Filter from './Filter/Filter';
// import Navigation from './Navigation/Navigation';
// import Register from './Register/RegisterForm';
// import Login from './Login/LoginForm';

// const App = () => {
//   const { token, isAuthenticated } = useSelector(state => state.auth);
//   const contacts = useSelector(state => state.contacts.contacts);
//   const filter = useSelector(state => state.contacts.filter);
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     // Fetch contacts from the backend API when the application starts or reloads
//     if (token) {
//       dispatch(fetchContacts());
//     }
//   }, [dispatch, token]);

//   const handleAddContact = async contact => {
//     try {
//       await dispatch(addContact(contact));
//       // Handle successful contact addition
//     } catch (error) {
//       // Handle contact addition error
//     }
//   };

//   const handleDeleteContact = async id => {
//     try {
//       await dispatch(deleteContact(id));
//       // Handle successful contact deletion
//     } catch (error) {
//       // Handle contact deletion error
//     }
//   };

//   const handleFilterChange = event => {
//     dispatch(setFilter(event.target.value));
//   };

//   const filteredContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const handleRegister = async ({ username, password }) => {
//     try {
//       await dispatch(registerUser({ username, password }));
//       // Redirect to the contacts page after successful registration
//       return <Navigate to="/contacts" />;
//     } catch (error) {
//       console.error('Registration error:', error);
//     }
//   };

//   const handleLogin = async ({ username, password }) => {
//     try {
//       await dispatch(loginUser({ username, password }));
//       // Redirect to the contacts page after successful login
//       return <Navigate to="/contacts" />;
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     // Redirect to the login page after successful logout
//     return <Navigate to="/login" />;
//   };

//   return (
//     <div>
//       <Router>
//         <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
//         <h1>Phonebook</h1>
//         <Routes>
//           <Route
//             path="/login"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/contacts" />
//               ) : (
//                 <Login onLogin={handleLogin} />
//               )
//             }
//           />
//           <Route
//             path="/register"
//             element={<Register onRegister={handleRegister} />}
//           />
//           <Route
//             path="/contacts"
//             element={
//               isAuthenticated ? (
//                 <>
//                   <ContactForm addContact={handleAddContact} />
//                   <h2>Contacts</h2>
//                   <Filter filter={filter} onFilterChange={handleFilterChange} />
//                   <ContactList
//                     contacts={filteredContacts}
//                     deleteContact={handleDeleteContact}
//                   />
//                 </>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;

// //   useEffect(() => {
// //     // Fetch contacts from the backend API when the application starts or reloads
// //     dispatch(fetchContacts());
// //   }, [dispatch]);
// //   Login;

// //   const handleAddContact = contact => {
// //     dispatch(addContact(contact));
// //   };

// //   const handleDeleteContact = id => {
// //     dispatch(deleteContact(id));
// //   };

// //   const handleFilterChange = event => {
// //     dispatch(setFilter(event.target.value));
// //   };

// //   const filteredContacts = contacts.filter(contact =>
// //     contact.name.toLowerCase().includes(filter.toLowerCase())
// //   );

// //   return (
// //     <div>
// //       <h1>Phonebook</h1>
// //       <ContactForm addContact={handleAddContact} />
// //       <h2>Contacts</h2>
// //       <Filter filter={filter} onFilterChange={handleFilterChange} />
// //       <ContactList
// //         contacts={filteredContacts}
// //         deleteContact={handleDeleteContact}
// //       />
// //     </div>
// //   );
// // };

// // export default App;

import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from '../redux/auth/operations';
import { useAuth } from '../hooks';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
