import Loader from '@components/loader/Loader';
import Message from '@components/message/Message';

import {nanoid} from 'nanoid';

import React, {useContext, useRef, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import {Context} from '../..';
import {ENTER_KEYCODE} from '../../consts';
import {submitMessage} from '../../api';
import './chat.less';

/**
 * @component
 * @return {func} Возвращает разметку для чата
 */
const Chat = () => {
  /**
   * Забираем из контекста объекты:
   * auth для получения в дальнейшем данных пользователя
   * firestore для получения и загрузки сообщений
   * @type {Object}
   * @property {Object} auth
   * @property {firestore} auth
   */
  const {auth, firestore} = useContext(Context);

  /**
    * Храним сотстояние кнопи отправки сообщения.
    * Если нет введённого текста или он состоит целиком из пробелов то блокируем кнопку
   */
  const [disabledStatus, setDisabledStatus] = useState(true);

  /**
   * Создаём ref для отслеживания текущего значения инпута
   * @type {Object}
   */
  const inputRef = useRef();

  /**
   * Получаем данные пользователя
   * @type {Object}
   * @property {Object} userData
   */
  const [userData] = useAuthState(auth);

  /**
   * Получаем списко сообщений и статус загрузки
   */
  const [messages, loading] = useCollectionData(
      firestore.collection(`messages`).orderBy(`createdAt`)
  );

  /**
 * Отправка сообщения по клику
 * После отправки очищаем значение поля ввода
 * @listens Click
 */
  const submitClickHandler = () => {
    const messageId = nanoid();

    submitMessage(userData, inputRef.current.value, messageId, firestore);
    inputRef.current.value = ``;
  };

  /**
   * Отправка сообщения по нажатию клавиши enter.
   * После отправки очищаем значение поля ввода
   * @param {Object} evt Объект ивента
   * @listens KeyUp
   */
  const inputKeyUpHandler = (evt) => {
    const str = inputRef.current.value.replace(/\s/g, ``);

    if (evt.keyCode === ENTER_KEYCODE && str) {
      const messageId = nanoid();

      submitMessage(userData, inputRef.current.value, messageId, firestore);
      inputRef.current.value = ``;
    }
  };

  /**
   * Отслеживаем изменения значения поля ввода.
   * В зависимости от значения блокируем или разблокируем кнопку отправки
   * @listens Change
   */
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
