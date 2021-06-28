import React from 'react';
import {NavLink} from 'react-router-dom';
import {Routes} from '../../consts';
import './page-404.less';


/**
 * Страница 404
 * @component
 * @return {func} Возвращает cтраницу 404
 */
const Page404 = () => {
  return (
    <div className="page-404">
      <h1 className="page-404__title">Упс, У нас нет такой страницы</h1>
      <NavLink to={Routes.MAIN}><button className="btn"><span>Вернуться</span></button></NavLink>
    </div>
  );
};

export default Page404;
