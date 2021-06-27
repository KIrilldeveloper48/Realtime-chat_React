import React from 'react';
import {NavLink} from 'react-router-dom';
import {Routes} from '../../consts';

const Main = () => {

  return (
    <div>
      <p>Realtime chat - это инновационная платформа для общения пользователей</p>
      <NavLink to={Routes.CHAT}>Начать</NavLink>
    </div>
  );
};

export default Main;
