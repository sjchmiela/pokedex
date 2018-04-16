// @flow

import * as React from "react";
import Drawer from "material-ui/Drawer";
import Hidden from "material-ui/Hidden";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100vh",
  },
  // Sorry for the !importants
  // It's either this or passing classNames not as className
  // to ApplicationBar's components, but by classes={{ root }}
  appBar: {
    position: "absolute !important",
    [theme.breakpoints.up("md")]: {
      marginLeft: `${drawerWidth}px`,
      width: `calc(100% - ${drawerWidth}px) !important`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none !important",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  content: {
    flexGrow: 1,
    overflowY: "scroll",
    padding: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.default,
  },
  bottomNavigation: {
    left: 0,
    right: 0,
    bottom: 0,
    position: "fixed",
    zIndex: theme.zIndex.appBar,
  },
});

type PropsType = {
  renderAppBar: ({
    className: string,
    menuIconClassName: string,
    onDrawerToggle: () => void,
  }) => React.Node,
  children?: ?React.Node,
  classes: Object,
  renderDrawerHeader: () => React.Node,
  renderDrawerContent: () => React.Node,
  renderBottomNavigation?: ({ className: string }) => ?React.Node,
};

type StateType = {
  mobileOpen: boolean,
};

class ResponsiveDrawer extends React.Component<PropsType, StateType> {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  renderAppBar = () =>
    this.props.renderAppBar({
      className: this.props.classes.appBar,
      onDrawerToggle: this.handleDrawerToggle,
      menuIconClassName: this.props.classes.navIconHide,
    });

  renderDrawer = (): React.Node => (
    <div>
      <div className={this.props.classes.toolbar}>
        {this.props.renderDrawerHeader()}
      </div>
      <Divider />
      {this.props.renderDrawerContent()}
    </div>
  );

  maybeRenderBottomNavigationPlaceholder = (): ?React.Node =>
    this.props.renderBottomNavigation ? (
      <div className={this.props.classes.toolbar} />
    ) : null;

  maybeRenderBottomNavigation = (): ?React.Node =>
    this.props.renderBottomNavigation
      ? this.props.renderBottomNavigation({
          className: this.props.classes.bottomNavigation,
        })
      : null;

  render() {
    const { classes } = this.props;

    const drawer = this.renderDrawer();

    const drawerClasses = { paper: classes.drawerPaper };

    return (
      <div className={classes.root}>
        {this.renderAppBar()}
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            classes={drawerClasses}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={
              { keepMounted: true } // Better open performance on mobile.
            }
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer variant="permanent" open classes={drawerClasses}>
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
          {this.maybeRenderBottomNavigationPlaceholder()}
        </main>
        {this.maybeRenderBottomNavigation()}
      </div>
    );
  }
}

export default withStyles(styles)(ResponsiveDrawer);
