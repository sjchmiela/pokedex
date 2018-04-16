// @flow

import * as React from "react";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import FormControl from "material-ui/Form/FormControl";

import type { ContextRouter } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import QrReader from "react-qr-reader";

import PaperSheet from "../atoms/PaperSheet";
import ErrorMessage from "../atoms/ErrorMessage";
import catchPokemon from "../services/catchPokemon";
import type { ContextType } from "../services/withRelayEnvironmentContext";
import withRelayEnvironmentContext from "../services/withRelayEnvironmentContext";

type PropsType = ContextRouter &
  ContextType & {
    classes: { qrReader: string },
  };

type StateType = {
  error: ?Error,
  processing: boolean,
  tokenInput: string,
};

const styles = {
  qrReader: {
    width: "100%",
  },
};

class CatchPage extends React.Component<PropsType, StateType> {
  state = {
    processing: false,
    tokenInput: "",
    error: null,
  };

  handleTokenInputChange = (event: Object) => {
    this.setState({ tokenInput: event.target.value });
  };

  handleSubmit = (event: Object) => {
    event.preventDefault();
    this.handleToken(this.state.tokenInput);
  };

  handleToken = (data: string) => {
    if (!data || this.state.processing) return;
    this.setState(
      {
        error: null,
        processing: true,
        tokenInput: data,
      },
      () =>
        catchPokemon(
          {
            nestToken: data,
          },
          this.props.environment,
        )
          .then(this.handleSuccess)
          .catch(this.handleError),
    );
  };

  handleSuccess = ({ pokemon }: { pokemon: Object }) => {
    alert(`You have caught ${pokemon.species.name}. Congrats!`);
    this.setState({ processing: false, tokenInput: "" });
  };

  handleError = (error: Error) =>
    this.setState({
      processing: false,
      error,
    });

  handleScannerError = () =>
    this.setState({ error: new Error("Scanner error") });

  maybeRenderError = (): ?React.Node =>
    this.state.error ? <ErrorMessage error={this.state.error} /> : null;

  render() {
    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <PaperSheet headline="Scan the nest QR code">
            <QrReader
              onScan={this.handleToken}
              onError={this.handleScannerError}
              className={this.props.classes.qrReader}
              delay={this.state.processing ? false : 500}
            />
            {this.maybeRenderError()}
          </PaperSheet>
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <PaperSheet headline="Enter the nest token">
            {this.maybeRenderError()}
            <form onSubmit={this.handleSubmit}>
              <FormControl fullWidth margin="dense">
                <TextField
                  label="Token"
                  disabled={this.state.processing}
                  onChange={this.handleTokenInputChange}
                  value={this.state.tokenInput}
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
                  Catch!
                </Button>
              </FormControl>
            </form>
          </PaperSheet>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withRelayEnvironmentContext(CatchPage));
