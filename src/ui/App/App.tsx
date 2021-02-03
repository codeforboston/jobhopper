import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from '../AboutPage';
import ContactPage from '../Contact';
import { TransitionPageContainer } from '../TransitionPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/contact">
        <ContactPage />
      </Route>
      <Route exact path="/about">
        <AboutPage />
      </Route>
      <Route path="/">
        <TransitionPageContainer />
      </Route>
    </Switch>
  );
}
