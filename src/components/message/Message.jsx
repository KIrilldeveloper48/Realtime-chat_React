import React from 'react';
import {PropTypes} from 'prop-types';


import './message.less';

/**
 * Компонент сообщения
 * @component
 * @param {Object} userData Пользовательские данные
 * @param {string} userData.avatar Аватар пользователя
 * @param {string} userData.name Имя пользователя
 * @param {string} userData.message Сообщение пользователя
 * @return {func} Возвращает разметку для сообщения
 */
const Message = ({avatar, name, message}) => {
  return (

    <article className="message">
      <img className="message__user-avatar" src={avatar} alt="" />
      <span className="message__user-name">{name}</span>
      <p className="message__text">{message}</p>
    </article>

  );
};

Message.propTypes = {
  /** Валидация типа для пропа avatar */
  avatar: PropTypes.string.isRequired,
  /** Валидация типа для пропа name */
  name: PropTypes.string.isRequired,
  /** Валидация типа для пропа message */
  message: PropTypes.string.isRequired,
};

export default React.memo(Message);
