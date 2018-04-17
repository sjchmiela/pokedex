// @flow

import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import RelayEnvironmentContext from "./services/RelayEnvironmentContext";

import RawApplicationDrawer from "./organisms/ApplicationDrawer";

import HomePage from "./pages/HomePage";

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
              <Route exact path="/" component={HomePage} />
            </Switch>
          </ApplicationDrawer>
        </Router>
      </RelayEnvironmentContext.Manager>
    );
  }
}
