import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from './containers/Home';

function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" exact component={Home} />
    </ReactRoutes>
  );
}

export default Routes;
