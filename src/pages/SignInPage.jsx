// @flow

import * as React from "react";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import InputLabel from "material-ui/Input/InputLabel";
import type { ContextRouter } from "react-router-dom";
import FormControl from "material-ui/Form/FormControl";

import PaperSheet from "../atoms/PaperSheet";
import LinkButton from "../atoms/LinkButton";
import ErrorMessage from "../atoms/ErrorMessage";
import PasswordInput from "../atoms/PasswordInput";
import type { ContextType } from "../services/withRelayEnvironmentContext";
import withRelayEnvironmentContext from "../services/withRelayEnvironmentContext";
import saveAuthenticationToken from "../services/saveAuthenticationToken";
// STEP 15
// Import the signIn function from the last step.

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
      () => {
        // STEP 16
        // Execute signIn function passing object with username and password from this.state
        // and this.props.environment as the second argument (evironment and setToken props are
        // managed by Relay Context defined in ../services/RelayEnvironmentContext.js)
        // Use `this.handleSuccess` as the success callback and `this.handleError` as the failure callback.
        alert("Processing signin");
      },
    );
  };

  handleSuccess = ({ token }: { token: string }) => {
    saveAuthenticationToken(token);
    this.props.setToken(token);
    // STEP 17
    // Add `console.log(token)` to see if the mutation works
    // Go to http://localhost:4000/sign_in and try to log in with credentials created in step 5
    // (or create new user with GraphiQL)
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
