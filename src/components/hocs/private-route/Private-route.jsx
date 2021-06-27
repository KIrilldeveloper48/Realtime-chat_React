import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';

import {Routes} from './../../../consts';


const PrivateRoute = ({render, path, exact, isLogined}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        switch (path) {
          case Routes.LOGIN:
            return !isLogined
              ? render(routeProps)
              : <Redirect to={Routes.CHAT} />;
          default:
            return isLogined
              ? render(routeProps)
              : <Redirect to={Routes.LOGIN} />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  isLogined: PropTypes.bool.isRequired,
};

export default PrivateRoute;
