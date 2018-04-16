// @flow

import "typeface-roboto";

import React from "react";
import ReactDOM from "react-dom";
import brown from "material-ui/colors/brown";
import yellow from "material-ui/colors/yellow";
import CssBaseline from "material-ui/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import ApplicationRouter from "./router";

const theme = createMuiTheme({
  palette: {
    primary: yellow,
    secondary: brown,
  },
});

const rootElement = document.getElementById("reactRoot");
if (rootElement) {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ApplicationRouter />
    </MuiThemeProvider>,
    rootElement,
  );
} else {
  console.error("No root element detected!");
}
