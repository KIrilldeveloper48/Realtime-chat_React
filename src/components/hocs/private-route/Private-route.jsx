import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';

import {Routes} from '../../../consts';

/**
 * HOC компонент для обработки приватных маршрутов
 * @component
 * @param {Object} props
 * @param {func} props.render Компонент для отрисовки
 * @param {string} props.path Путь по которому должен отрисовывать компонент
 * @param {bool} props.exact Указывает, что строка запроса должна в точности соответствовать шаблону маршрута. Если true то компонент будет отрисован только по маршруту "/route" или "/route/"
 * @param {bool} props.isLogined Залогинился пользователь или нет
 * @return {func} Возвращает компонент Route из react-router-dom с условием по отрисовке
 */
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
  /** Валидация типа для пропа exact */
  exact: PropTypes.bool.isRequired,
  /** Валидация типа для пропа path */
  path: PropTypes.string.isRequired,
  /** Валидация типа для пропа render */
  render: PropTypes.func.isRequired,
  /** Валидация типа для пропа isLogined */
  isLogined: PropTypes.bool.isRequired,
};

export default PrivateRoute;
