// @flow

import * as React from "react";
import Button from "material-ui/Button";
import { withRouter } from "react-router-dom";

class LinkButton extends React.PureComponent<Object> {
  handleClick = (event: Object) => {
    event.preventDefault();
    this.props.history.push(this.props.href);
  };

  render() {
    const { match, location, history, staticContext, ...rest } = this.props;

    return (
      <Button {...rest} onClick={this.handleClick}>
        {this.props.children}
      </Button>
    );
  }
}

export default withRouter(LinkButton);
