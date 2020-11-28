import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from '../AboutPage';
import ContactPage from '../Contact';
import LandingPage from '../LandingPage';
import TransitionPage from '../TransitionPage';
import transitions from '../../testing/data/transitionData';
import occupations from '../../testing/data/occupations';
import states from '../../testing/data/states';

export const App = () => (
  <Switch>
    <Route exact path="/transitions">
      <TransitionPage
        occupations={occupations}
        transitions={transitions}
        states={states}
      />
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
