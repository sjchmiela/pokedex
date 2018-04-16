// @flow

import * as React from "react";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import InputLabel from "material-ui/Input/InputLabel";
import type { ContextRouter } from "react-router-dom";
import FormControl from "material-ui/Form/FormControl";

import signIn from "../services/signIn";
import PaperSheet from "../atoms/PaperSheet";
import LinkButton from "../atoms/LinkButton";
import ErrorMessage from "../atoms/ErrorMessage";
import PasswordInput from "../atoms/PasswordInput";
import saveAuthenticationToken from "../services/saveAuthenticationToken";
import type { ContextType } from "../services/withRelayEnvironmentContext";
import withRelayEnvironmentContext from "../services/withRelayEnvironmentContext";

type PropsType = ContextRouter & ContextType;

type StateType = {
  error: ?Error,
  username: string,
  password: string,
  processing: boolean,
};

class SignInPage extends React.Component<PropsType, StateType> {
  state = { username: "", password: "", processing: false, error: null };

  handleSubmit = (event: Object) => {
    event.preventDefault();
    this.setState(
      {
        error: null,
        processing: true,
      },
      () =>
        signIn(
          {
            username: this.state.username,
            password: this.state.password,
          },
          this.props.environment,
        )
          .then(this.handleSuccess)
          .catch(this.handleError),
    );
  };

  handleSuccess = ({ token }: { token: string }) => {
    saveAuthenticationToken(token);
    this.props.setToken(token);
  };

  handleError = (error: Error) =>
    this.setState({
      processing: false,
      error,
    });

  handleUsernameChange = (event: Object) =>
    this.setState({ username: event.target.value });
  handlePasswordChange = (password: string) => this.setState({ password });

  maybeRenderError = (): ?React.Node =>
    this.state.error ? <ErrorMessage error={this.state.error} /> : null;

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
          <PaperSheet headline="Sign in">
            {this.maybeRenderError()}
            <form onSubmit={this.handleSubmit}>
              <FormControl fullWidth margin="dense">
                <TextField
                  label="Username"
                  disabled={this.state.processing}
                  onChange={this.handleUsernameChange}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="password">Password</InputLabel>
                <PasswordInput
                  id="password"
                  value={this.state.password}
                  disabled={this.state.processing}
                  onChange={this.handlePasswordChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Button
                  size="large"
                  type="submit"
                  variant="raised"
                  color="secondary"
                  onClick={this.handleSubmit}
                  disabled={this.state.processing}
                >
                  Sign in
                </Button>
              </FormControl>
            </form>
            <Grid item>
              <LinkButton size="small" color="secondary" href="/sign_up">
                Sign up
              </LinkButton>
            </Grid>
          </PaperSheet>
        </Grid>
      </Grid>
    );
  }
}

export default withRelayEnvironmentContext(SignInPage);
