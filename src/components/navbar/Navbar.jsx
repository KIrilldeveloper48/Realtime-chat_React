import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';

import {useAuthState} from 'react-firebase-hooks/auth';
import {Context} from '../..';

import {Routes} from '../../consts';

import Logo from '@/assets/img/logo';
import './navbar.less';

const Navbar = () => {
  const {auth} = useContext(Context);
  const [userData] = useAuthState(auth);

  const isLogined = Boolean(userData);

  const logoutClickHandler = () => {
    auth.signOut();
  };

  return (
    <nav className="navbar">
      <img className="navbar__logo" src={Logo} alt="Логотип" />
      {
        isLogined ?
          <button className="navbar__logout btn" onClick={logoutClickHandler}><span>Выйти</span></button>
          :
          <NavLink to={Routes.LOGIN} className="navbar__login btn"><span>Войти</span></NavLink>
      }
    </nav>
  );
};

export default Navbar;
