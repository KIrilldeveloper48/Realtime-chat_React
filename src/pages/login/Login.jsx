import React, {useContext} from 'react';
import Navbar from '@components/navbar/Navbar';
import {Context} from '../..';
import firebase from 'firebase/app';
import './login.less';


const Login = () => {
  const {auth} = useContext(Context);

  const loginClickHandler = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const {user} = await auth.signInWithPopup(provider);
  };

  return (
    <>
      <Navbar />
      <section className="login">
        <button className="login__btn btn" onClick={loginClickHandler}>Войти через Google</button>
      </section>
    </>
  );
};

export default Login;
