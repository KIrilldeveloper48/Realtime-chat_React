import React, {useContext, useState} from 'react';

import {Context} from '../..';
import {authorization} from '../../api';

import './login.less';

/**
 * Страница логина
 * @component
 * @return {func} Возвращает страницу логина
 */
const Login = () => {

  /**
   * Достаём обьект firebase для авторизации пользователя из контекста
   * @type {Object}
   * @property {Object} auth1
   */
  const {auth} = useContext(Context);

  /**
   * Будем хранить состоянии кнопки "Войти". Когда открыт popup входа, кнопка будет заблокирована
   * @type {Array<bool, func>}
   */
  const [disabledStatus, setDisabledStatus] = useState(false);

  /**
   * Обработчик клика для кнопки "Войти" для авторизации через Google
   * @type {func}
   * @listens Click
   */
  const loginClickHandler = () => {
    setDisabledStatus(true);
    authorization(auth).catch(() => setDisabledStatus(false));
  };

  return (
    <>
      <div className="login">
        <button className="login__btn btn" disabled={disabledStatus} onClick={loginClickHandler}><span>Войти через Google</span></button>
      </div>
    </>
  );
};

export default Login;
