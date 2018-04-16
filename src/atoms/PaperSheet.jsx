// @flow

import * as React from "react";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }),
  headline: {
    marginBottom: theme.spacing.unit,
  },
});

type PropsType = {
  children?: ?React.Node,
  classes: { root: string, headline: string },
  headline?: ?string,
};

class PaperSheet extends React.Component<PropsType> {
  renderHeader = () =>
    this.props.headline ? (
      <Typography
        variant="display1"
        component="h2"
        className={this.props.classes.headline}
      >
        {this.props.headline}
      </Typography>
    ) : null;

  render() {
    return (
      <Paper className={this.props.classes.root} elevation={4}>
        {this.renderHeader()}
        {this.props.children}
      </Paper>
    );
  }
}

export default withStyles(styles)(PaperSheet);
