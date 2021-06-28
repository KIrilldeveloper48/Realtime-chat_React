
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/components/App/App.jsx';
reactComponents['App'] = Component0;

import Component1 from '../src/pages/chat/Chat.jsx';
reactComponents['Chat'] = Component1;

import Component2 from '../src/components/loader/Loader.jsx';
reactComponents['Loader'] = Component2;

import Component3 from '../src/pages/login/Login.jsx';
reactComponents['Login'] = Component3;

import Component4 from '../src/pages/main/Main.jsx';
reactComponents['Main'] = Component4;

import Component5 from '../src/components/message/Message.jsx';
reactComponents['Message'] = Component5;

import Component6 from '../src/components/navbar/Navbar.jsx';
reactComponents['Navbar'] = Component6;

import Component7 from '../src/pages/page-404/Page-404.jsx';
reactComponents['Page404'] = Component7;

import Component8 from '../src/components/hocs/private-route/Private-route.jsx';
reactComponents['PrivateRoute'] = Component8;