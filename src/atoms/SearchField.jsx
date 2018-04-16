// @flow

import * as React from "react";
import TextField from "material-ui/TextField";
import { InputAdornment } from "material-ui/Input";

import SearchIcon from "@material-ui/icons/Search";

type PropsType = {
  placeholder?: ?string,
  onChange?: ?(string) => void,
};

export default class SearchField extends React.PureComponent<PropsType> {
  handleChange = (event: Object): void => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  };

  renderSearchAdornment = () => (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  );

  render() {
    return (
      <TextField
        fullWidth
        onChange={this.handleChange}
        placeholder={this.props.placeholder || "Search"}
        InputProps={{ startAdornment: this.renderSearchAdornment() }}
      />
    );
  }
}
