// pos-app/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import POS from './components/POS';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={POS} />
      </Switch>
    </Router>
  );
}

export default App;
