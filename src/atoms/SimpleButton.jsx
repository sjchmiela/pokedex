// @flow

import * as React from "react";
import classNames from "classnames";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
});

type PropsType = {
  onClick?: ?Function,
  fullWidth?: ?boolean,
  className?: string,
  buttonClassName?: ?string,
  children?: ?string,
  classes: { icon: string },
  IconComponent?: ?() => React.Node,
};

class SimpleButton extends React.PureComponent<PropsType> {
  renderIcon = (IconComponent: Function): React.Node => (
    <IconComponent
      className={classNames(
        this.props.classes.icon,
        this.props.buttonClassName,
      )}
    />
  );

  render() {
    const {
      IconComponent,
      children,
      buttonClassName,
      classes,
      ...rest
    } = this.props;

    const renderedIcon = IconComponent ? this.renderIcon(IconComponent) : null;

    return (
      <Button color="inherit" {...rest}>
        {renderedIcon} {children}
      </Button>
    );
  }
}

export default withStyles(styles)(SimpleButton);
