// @flow

import * as React from "react";
import Home from "@material-ui/icons/Home";
import { withRouter } from "react-router-dom";
import type { ContextRouter } from "react-router-dom";
import BottomNavigation from "material-ui/BottomNavigation";
import BottomNavigationAction from "material-ui/BottomNavigation/BottomNavigationAction";

import SimpleButton from "../atoms/SimpleButton";

const routes = [{ href: "/", icon: Home, label: "Home" }];

const NavigationButtons = (props: ContextRouter) => (
  // $FlowFixMe: Flow thinks React does not export Fragment. I don't care what it thinks.
  <React.Fragment>
    {routes.map(({ icon, label, href }) => (
      <SimpleButton
        key={label}
        IconComponent={icon}
        onClick={() => props.history.push(href)}
      >
        {label}
      </SimpleButton>
    ))}
  </React.Fragment>
);

const NavigationButtonsWithRouter = withRouter(NavigationButtons);

const BottomNavigationButtons = (
  props: ContextRouter & {
    className?: string,
  },
) => (
  <BottomNavigation
    className={props.className}
    onChange={(event, value) => props.history.push(value)}
    value={props.location.pathname}
  >
    {routes.map(({ icon: Icon, label, href }) => (
      <BottomNavigationAction
        key={label}
        value={href}
        label={label}
        icon={<Icon />}
      />
    ))}
  </BottomNavigation>
);

const BottomNavigationButtonsWithRouter = withRouter(BottomNavigationButtons);

export {
  BottomNavigationButtonsWithRouter as BottomNavigation,
  NavigationButtonsWithRouter as SimpleButtons,
  routes,
};
