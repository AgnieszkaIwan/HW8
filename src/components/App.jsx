import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Route,
  BrowserRouter as Router,
  Navigate,
  Routes,
} from 'react-router-dom';
import { fetchContacts } from '../redux/contactsSlice';
import { loginUser, registerUser, logout } from '../redux/authSlice';
import { addContact, deleteContact, setFilter } from '../redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Navigation from './Navigation/Navigation';
import Register from './Register/Register';
import Login from './Login/Login';

const App = () => {
  const { token, isAuthenticated } = useSelector(state => state.auth);
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Fetch contacts from the backend API when the application starts or reloads
    if (token) {
      dispatch(fetchContacts());
    }
  }, [dispatch, token]);

  const handleAddContact = async contact => {
    try {
      await dispatch(addContact(contact));
      // Handle successful contact addition
    } catch (error) {
      // Handle contact addition error
    }
  };

  const handleDeleteContact = async id => {
    try {
      await dispatch(deleteContact(id));
      // Handle successful contact deletion
    } catch (error) {
      // Handle contact deletion error
    }
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleRegister = async ({ username, password }) => {
    try {
      await dispatch(registerUser({ username, password }));
      // Redirect to the contacts page after successful registration
      return <Navigate to="/contacts" />;
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      await dispatch(loginUser({ username, password }));
      // Redirect to the contacts page after successful login
      return <Navigate to="/contacts" />;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    // Redirect to the login page after successful logout
    return <Navigate to="/login" />;
  };

  return (
    <div>
      <Router>
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <h1>Phonebook</h1>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/contacts" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/contacts"
            element={
              isAuthenticated ? (
                <>
                  <ContactForm addContact={handleAddContact} />
                  <h2>Contacts</h2>
                  <Filter filter={filter} onFilterChange={handleFilterChange} />
                  <ContactList
                    contacts={filteredContacts}
                    deleteContact={handleDeleteContact}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

//   useEffect(() => {
//     // Fetch contacts from the backend API when the application starts or reloads
//     dispatch(fetchContacts());
//   }, [dispatch]);
//   Login;

//   const handleAddContact = contact => {
//     dispatch(addContact(contact));
//   };

//   const handleDeleteContact = id => {
//     dispatch(deleteContact(id));
//   };

//   const handleFilterChange = event => {
//     dispatch(setFilter(event.target.value));
//   };

//   const filteredContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div>
//       <h1>Phonebook</h1>
//       <ContactForm addContact={handleAddContact} />
//       <h2>Contacts</h2>
//       <Filter filter={filter} onFilterChange={handleFilterChange} />
//       <ContactList
//         contacts={filteredContacts}
//         deleteContact={handleDeleteContact}
//       />
//     </div>
//   );
// };

// export default App;
