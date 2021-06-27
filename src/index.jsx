import 'normalize.css';
import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from '@components/App/App';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

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
