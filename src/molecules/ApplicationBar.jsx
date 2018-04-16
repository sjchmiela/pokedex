// @flow

import * as React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";

import MenuIcon from "@material-ui/icons/Menu";

const styles = () => ({
  flex: {
    flex: 1,
  },
});

type PropsType = {
  classes: { flex: string, rotate: string },
  className: string,
  children?: React.Node,
  menuIconClassName: string,
  onDrawerToggle: () => void,
};

class ApplicationBar extends React.PureComponent<PropsType> {
  renderMenuIcon = () => (
    <IconButton
      color="inherit"
      onClick={this.props.onDrawerToggle}
      className={this.props.menuIconClassName}
    >
      <MenuIcon />
    </IconButton>
  );

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={this.props.className}>
        <Toolbar>
          {this.renderMenuIcon()}
          <Typography variant="title" color="inherit" className={classes.flex}>
            Pokédex
          </Typography>
          {this.props.children}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(ApplicationBar);
