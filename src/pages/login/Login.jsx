import React, {useContext} from 'react';
import firebase from 'firebase/app';

import {Context} from '../..';
import './login.less';


const Login = () => {
  const {auth} = useContext(Context);

  const loginClickHandler = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    // eslint-disable-next-line no-unused-vars
    const {user} = await auth.signInWithPopup(provider);
  };

  return (
    <>
      <div className="login">
        <button className="login__btn btn" onClick={loginClickHandler}><span>Войти через Google</span></button>
      </div>
    </>
  );
};

export default Login;
