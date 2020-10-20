import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Psikotes from './features/psikotes/Psikotes';
import Section from './features/section/Section';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/psikotes" component={Psikotes}/>
        <Route path="/section/:colId" component={Section}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
