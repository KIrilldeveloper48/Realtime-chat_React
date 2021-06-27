import React from 'react';
import {PropTypes} from 'prop-types';


import './message.less';

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
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default React.memo(Message);
