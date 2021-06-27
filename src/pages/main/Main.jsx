import React from 'react';
import {NavLink} from 'react-router-dom';
import {Routes} from '../../consts';

import './main.less';

const Main = () => {

  return (
    <div className="first-screen">
      <h1 className="first-screen__title">Realtime chat <br /> <span>инновационная платформа для общения</span></h1>
      <NavLink className="first-screen__start btn" to={Routes.CHAT}><span>Поехали</span></NavLink>
    </div>
  );
};

export default Main;
