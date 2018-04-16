// @flow

import * as React from "react";
import Paper from "material-ui/Paper";
import orange from "material-ui/colors/amber";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import ErrorIcon from "@material-ui/icons/Error";

const styles = theme => ({
  paper: {
    display: "flex",
    backgroundColor: orange[600],
    padding: theme.spacing.unit * 2,
  },
  message: {
    whiteSpace: "pre-line",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

type PropsType = {
  error: Error,
  classes: { paper: string, message: string, icon: string },
};

class WarnMessage extends React.PureComponent<PropsType> {
  render = () => (
    <Paper elevation={1} className={this.props.classes.paper}>
      <ErrorIcon className={this.props.classes.icon} />
      <Typography className={this.props.classes.message}>
        {this.props.error.message}
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(WarnMessage);
