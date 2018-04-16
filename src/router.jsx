// @flow

import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import {
  enforceAuthenticated,
  enforceUnauthenticated,
} from "./services/routerEnforcers";
import RelayEnvironmentContext from "./services/RelayEnvironmentContext";

import RawApplicationDrawer from "./organisms/ApplicationDrawer";

import HomePage from "./pages/HomePage";
import CatchPage from "./pages/CatchPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const AuthenticatedRoute = enforceAuthenticated(Route);
const UnauthenticatedRoute = enforceUnauthenticated(Route);

// ApplicationDrawer has been blocking updates
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
const ApplicationDrawer = withRouter(RawApplicationDrawer);

export default class ApplicationRouter extends React.Component<{}> {
  render() {
    return (
      <RelayEnvironmentContext.Manager>
        <Router>
          <ApplicationDrawer>
            <Switch>
              <AuthenticatedRoute exact path="/" component={HomePage} />
              <AuthenticatedRoute path="/catch" component={CatchPage} />
              <UnauthenticatedRoute path="/sign_in" component={SignInPage} />
              <UnauthenticatedRoute path="/sign_up" component={SignUpPage} />
            </Switch>
          </ApplicationDrawer>
        </Router>
      </RelayEnvironmentContext.Manager>
    );
  }
}
