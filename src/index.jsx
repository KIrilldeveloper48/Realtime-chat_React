import App from '@components/App/App';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'normalize.css';

import React, {createContext} from 'react';
import ReactDOM from 'react-dom';

/** Инциализация firebase */
firebase.initializeApp(
    {
      apiKey: `AIzaSyC-lDQtlA3zFgCGb9iQwBRsNsuYADsKfgE`,
      authDomain: `realtime-chat-af52c.firebaseapp.com`,
      projectId: `realtime-chat-af52c`,
      storageBucket: `realtime-chat-af52c.appspot.com`,
      messagingSenderId: `353426360424`,
      appId: `1:353426360424:web:899b0aac2084a92bc4d3dd`
    }
);


/**
 * Объект firebase для авторизации пользователей
*/
const auth = firebase.auth();

/**
 * Объект firebase для доступа к хранилищу
*/
const firestore = firebase.firestore();

/**
 * @typedef func
 * @property {Object} firebase
 * @property {Object} stauthatus
 * @property {Object} firestore
 */
export const Context = createContext({
  firebase,
  auth,
  firestore
});


ReactDOM.render(
    <Context.Provider value={{
      firebase,
      auth,
      firestore
    }}>
      <App />
    </Context.Provider>,
    document.querySelector(`#root`)
);
