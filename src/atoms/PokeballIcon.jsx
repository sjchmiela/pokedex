// @flow

import * as React from "react";
import classNames from "classnames";
import { withStyles } from "material-ui/styles";
import DonutSmall from "@material-ui/icons/DonutSmall";

const styles = () => ({
  root: {
    transform: "rotate(90deg)",
  },
});

class PokeballIcon extends React.PureComponent<Object> {
  render() {
    return (
      <DonutSmall
        {...this.props}
        className={classNames(this.props.classes.root, this.props.className)}
      />
    );
  }
}

export default withStyles(styles)(PokeballIcon);
