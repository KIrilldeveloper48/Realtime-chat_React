import React, {useContext, useRef, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import {nanoid} from 'nanoid';
import {submitMessage} from './../../api';

import './chat.less';

import Loader from '@components/loader/Loader';
import Message from '@components/message/Message';

import {ENTER_KEYCODE} from '../../consts';
import {Context} from '../..';

const Chat = () => {
  const {auth, firestore} = useContext(Context);
  const [userData] = useAuthState(auth);

  const inputRef = useRef();
  const [disabledStatus, setDisabledStatus] = useState(true);

  const [messages, loading] = useCollectionData(
      firestore.collection(`messages`).orderBy(`createdAt`)
  );

  const submitClickHandler = () => {
    const messageId = nanoid();
    submitMessage(userData, inputRef.current.value, messageId, firestore);
    inputRef.current.value = ``;
  };

  const inputKeyUpHandler = (evt) => {
    const str = inputRef.current.value.replace(/\s/g, ``);

    if (evt.keyCode === ENTER_KEYCODE && str) {
      const messageId = nanoid();

      submitMessage(userData, inputRef.current.value, messageId, firestore);
      inputRef.current.value = ``;
    }
  };

  const inputChangeHandler = () => {
    const str = inputRef.current.value.replace(/\s/g, ``);

    if (str) {
      setDisabledStatus(false);
    } else {
      setDisabledStatus(true);
    }
  };

  return (
    loading ? <Loader />
      :
      <section className="chat">
        <div className="chat__window">
          <ul className="chat__list">

            {
              messages.map((data) => {

                const extraClass = userData.uid === data.userId ? `chat__item--self-message` : ``;

                return (
                  <li key={data.messageId} className={`chat__item ${extraClass}`}>
                    <Message
                      avatar={data.userAvatar}
                      name={data.userName}
                      message={data.userMessage}/>
                  </li>
                );
              })
            }

          </ul>
        </div>

        <div className="chat__textfield">
          <textarea type="text" placeholder="Введите сообщение" ref={inputRef} onKeyUp={inputKeyUpHandler} onChange={inputChangeHandler}/>
          <button onClick={submitClickHandler} disabled={disabledStatus}>Ввод</button>
        </div>

      </section>
  );
};

export default Chat;
