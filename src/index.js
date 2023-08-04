// import React from 'react';
// import { Provider } from 'react-redux';
// import { createRoot } from 'react-dom/client';
// import App from './components/App';
// import store from './redux/store';
// import 'react-notifications/lib/notifications.css';
// import './index.css';

// const rootElement = document.getElementById('root');

// createRoot(rootElement).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'modern-normalize';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/goit-react-hw-07-phonebook">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
