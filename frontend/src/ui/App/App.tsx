import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from '../AboutPage';
import ContactPage from '../Contact';
import LandingPage from '../LandingPage';
import { TransitionPageContainer } from '../TransitionPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/transitions">
        <TransitionPageContainer />
      </Route>
      <Route exact path="/contact">
        <ContactPage />
      </Route>
      <Route exact path="/about">
        <AboutPage />
      </Route>
      <Route path="/">
        <LandingPage />
      </Route>
    </Switch>
  );
}
