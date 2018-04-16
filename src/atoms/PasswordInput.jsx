// @flow

import * as React from "react";
import Input from "material-ui/Input/Input";
import IconButton from "material-ui/IconButton";
import InputAdornment from "material-ui/Input/InputAdornment";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

type PropsType = {
  id?: string,
  value: string,
  disabled?: boolean,
  onChange?: ?(string) => void,
};

type StateType = {
  showPassword: boolean,
};

export default class PasswordInput extends React.PureComponent<
  PropsType,
  StateType,
> {
  state = { showPassword: false };

  handleChange = (event: Object): void => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  };

  handleClickShowPassword = () =>
    this.setState({
      showPassword: !this.state.showPassword,
    });

  renderEndAdornment = () => (
    <InputAdornment position="end">
      <IconButton onClick={this.handleClickShowPassword}>
        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  render() {
    // Appease Flow <3
    const { onChange, ...rest } = this.props;

    return (
      <Input
        fullWidth
        {...rest}
        type={this.state.showPassword ? "text" : "password"}
        endAdornment={this.renderEndAdornment()}
        onChange={this.handleChange}
      />
    );
  }
}
