import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from '../../pages/login/Login';
import Chat from '../../pages/chat/Chat';
import Main from '../../pages/main/Main';
import Page404 from '../../pages/page-404/Page-404';
import PrivateRoute from '../hocs/private-route/Private-route';

import {Routes} from '../../consts';


import './app.less';

const App = () => {
  const isLogined = false;
  return (
    <BrowserRouter>

      <Switch>

        <Route exact path={Routes.MAIN}>
          <Main />
        </Route>

        <PrivateRoute exact
          path={Routes.LOGIN}
          render={() => <Login />}
          isLogined={isLogined}>
        </PrivateRoute>

        <PrivateRoute exact
          path={Routes.CHAT}
          render={() => <Chat />}
          isLogined={isLogined}>
        </PrivateRoute>

        <Route>
          <Page404 />
        </Route>

      </Switch>
    </BrowserRouter>
  );
};

export default App;
