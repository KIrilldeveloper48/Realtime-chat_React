import PrivateRoute from '@components/hocs/private-route/Private-route';
import Loader from '@components/loader/Loader';
import Navbar from '@components/navbar/Navbar';
import Chat from '@pages/chat/Chat';
import Login from '@pages/login/Login.jsx';
import Main from '@pages/main/Main';
import Page404 from '@pages/page-404/Page-404';

import React, {useContext} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Context} from '../..';
import {Routes} from '../../consts';
import './app.less';

/**
 * Точка входа в приложение
 * @component
 * @return {func}
 */
const App = () => {
  const {auth} = useContext(Context);
  const [userData, loadingStatus] = useAuthState(auth);
  const isLogined = Boolean(userData);

  return (
    <BrowserRouter>
      <Navbar />
      <section className="main-content">
        {
          loadingStatus ?

            <Loader />
            :
            <Switch>

              <Route exact path={Routes.MAIN}>
                <Main isLogined={isLogined}/>
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
        }

      </section>

    </BrowserRouter>
  );
};

export default App;
