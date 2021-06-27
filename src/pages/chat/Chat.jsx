import React, {useContext, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import firebase from 'firebase/app';

import Loader from '@components/loader/Loader';

import {Context} from '../..';
import './chat.less';

const Chat = () => {
  const {auth, firestore} = useContext(Context);
  const [userData] = useAuthState(auth);
  const [message, setMessage] = useState(``);
  const [messages, loading] = useCollectionData(
      firestore.collection(`messages`).orderBy(`createdAt`)
  );

  const textfieldChangeHandler = (evt) => {
    setMessage(evt.target.value);
  };

  const submitMessage = async () => {
    firestore.collection(`messages`).add({
      userId: userData.uid,
      userName: userData.displayName,
      userAvatar: userData.photoURL,
      userMessage: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    setMessage(``);
  };

  return (
    loading ? <Loader />
      :
      <section className="Chat">
        <div className="chat__window">
          {messages.map((messageData) => {
            return (
              <div>
                <img src={messageData.userAvatar} alt="" />
                <p>{messageData.userName}</p>
                <p>{messageData.userMessage}</p>
              </div>
            );
          })}

        </div>
        <input type="textarea" value={message} onChange={textfieldChangeHandler}/>
        <button onClick={submitMessage}>Ок</button>
      </section>
  );
};

export default Chat;
