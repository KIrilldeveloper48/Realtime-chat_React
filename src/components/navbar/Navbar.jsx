import Logo from '@/assets/img/logo';

import React, {useContext} from 'react';

import {useAuthState} from 'react-firebase-hooks/auth';
import {Context} from '../..';
import './navbar.less';

/**
 * Компонент меню
 * @component
 * @return {func} Возвращает разметку для меню
 */
const Navbar = () => {
  /**
   * Забираем объект авторизации их контекста
   */
  const {auth} = useContext(Context);

  /**
   * Получаем пользовательские данные
   */
  const [userData] = useAuthState(auth);

  /**
   * Флаг наличия пользовательских данных
   * @type {bool}
   */
  const isLogined = Boolean(userData);

  /**
   * Обработчик кнопки "Выйти"
   * При нажатии происходит сброс авторизации.
   * @listens Click
   */
  const logoutClickHandler = () => {
    auth.signOut();
  };

  return (
    <nav className="navbar">
      <img className="navbar__logo" src={Logo} alt="Логотип" />
      {
        isLogined &&
          <button className="navbar__logout btn" onClick={logoutClickHandler}><span>Выйти из аккаунта</span></button>
      }
    </nav>
  );
};

export default Navbar;
