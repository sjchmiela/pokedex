// @flow

import * as React from "react";
import { withStyles } from "material-ui/styles";
import CircularProgress from "material-ui/Progress/CircularProgress";

const styles = () => ({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
});

// We need to export this component as a proper
// React.Component (not a simple function) to appease
// QueryRenderer's render return type.
class Loading extends React.PureComponent<{ classes: { root: string } }> {
  render = () => (
    <div className={this.props.classes.root}>
      <CircularProgress />
    </div>
  );
}

export default withStyles(styles)(Loading);
