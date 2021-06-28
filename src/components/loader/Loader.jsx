import React from 'react';
import './loader.less';

/**
 * Компонент лоадера
 * @component
 * @return {func} Возвращает разметку для лоадера
 */
const Loader = () => {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
