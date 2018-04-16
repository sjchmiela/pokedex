// @flow

import * as React from "react";
import Grid from "material-ui/Grid";
import { graphql } from "react-relay";

import PaperSheet from "../atoms/PaperSheet";
import withRelayData from "../services/withRelayData";
import RecentlyCaughtPokemonsList from "../organisms/RecentlyCaughtPokemonsList";

import HomePageQuery from "./__generated__/HomePageQuery";

class HomePage extends React.Component<HomePageQuery> {
  renderRecentlyCaughtPokemonsList = () =>
    this.props.me.trainer ? (
      <Grid item xs={12} sm={8} md={6} lg={8} xl={4}>
        <PaperSheet headline="Recently caught Pokémons">
          <RecentlyCaughtPokemonsList trainer={this.props.me.trainer} />
        </PaperSheet>
      </Grid>
    ) : null;

  render() {
    return (
      <Grid container justify="center">
        {this.renderRecentlyCaughtPokemonsList()}
      </Grid>
    );
  }
}

export default withRelayData(
  HomePage,
  graphql`
    query HomePageQuery {
      me {
        trainer {
          id
          ...RecentlyCaughtPokemonsList_trainer
        }
      }
    }
  `,
);
