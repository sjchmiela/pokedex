// @flow

import * as React from "react";
import Grid from "material-ui/Grid";
import { graphql } from "react-relay";

import PaperSheet from "../atoms/PaperSheet";
import withRelayData from "../services/withRelayData";
import RecentlyCaughtPokemonsList from "../organisms/RecentlyCaughtPokemonsList";

// STEP 26
// Import `HomePageQuery` from ./__generated__/HomePageQuery and use it as a type
// annotation for React.Component props

export default class HomePage extends React.Component<HomePageQuery> {
  renderRecentlyCaughtPokemonsList = () =>
    this.props.me.trainer ? (
      <Grid item xs={12} sm={8} md={6} lg={8} xl={4}>
        <PaperSheet headline="Recently caught Pokémons">
          <RecentlyCaughtPokemonsList trainer={this.props.me.trainer} />
        </PaperSheet>
      </Grid>
    ) : null;

  render() {
    // STEP 27
    // Execute `this.renderRecentlyCaughtPokemonsList` and wrap it in `Grid`
    return <Grid container justify="center" />;
  }
}

// STEP 25
// Remove `export default` from before `class HomePage` and add new `export default`
// exporting HomePage wrapped in `withRelayData`. Use the fragment defined in
// ./src/organisms/RecentlyCaughtPokemonsList.jsx
