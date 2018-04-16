// @flow

import * as React from "react";
import Avatar from "material-ui/Avatar";
import { withStyles } from "material-ui/styles";

const styles = () => ({
  img: {
    imageRendering: "pixelated",
  },
});

class PokemonImage extends React.PureComponent<Object> {
  render() {
    return <Avatar {...this.props} />;
  }
}

export default withStyles(styles)(PokemonImage);
