import {PropTypes} from 'prop-types';
import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import {Routes} from '../../consts';
import './main.less';

/**
 * Главная страница
 * @component
 * @param {bool} isLogined Флаг авторизации
 * @return {func} Главная страница
 */
const Main = ({isLogined}) => {

  if (isLogined) {
    return <Redirect to={Routes.CHAT} />;
  }
  return (
    <div className="first-screen">
      <h1 className="first-screen__title">Realtime chat <br /> <span>инновационная платформа для общения</span></h1>
      <NavLink className="first-screen__start btn" to={Routes.CHAT}><span>Поехали</span></NavLink>
    </div>
  );
};

Main.propTypes = {
  /** Валидация типа пропа isLogined */
  isLogined: PropTypes.bool.isRequired
};

export default Main;
