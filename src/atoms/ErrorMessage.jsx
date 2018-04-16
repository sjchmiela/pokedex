// @flow

import * as React from "react";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import ErrorIcon from "@material-ui/icons/Error";

const styles = theme => ({
  paper: {
    display: "flex",
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.error.main,
  },
  message: {
    whiteSpace: "pre-line",
    color: theme.palette.error.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.error.contrastText,
    marginRight: theme.spacing.unit,
  },
});

type PropsType = {
  error: Error,
  classes: { paper: string, message: string, icon: string },
};

class ErrorMessage extends React.PureComponent<PropsType> {
  render = () => (
    <Paper elevation={1} className={this.props.classes.paper}>
      <ErrorIcon className={this.props.classes.icon} />
      <Typography className={this.props.classes.message}>
        {this.props.error.message}
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(ErrorMessage);
