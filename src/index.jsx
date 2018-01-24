import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
  );
};
render(Home);
if (process.env.NODE_ENV !== 'production') {
  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./components/home', () => {
      render(Home);
    });
  }
}
