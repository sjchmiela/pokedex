// @flow

import * as React from "react";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { graphql, createPaginationContainer } from "react-relay";

import WarnMessage from "../atoms/WarnMessage";
import SimpleButton from "../atoms/SimpleButton";
import ErrorMessage from "../atoms/ErrorMessage";
import PokemonsList from "../molecules/PokemonsList";

import RecentlyCaughtPokemonsList_trainer from "./__generated__/RecentlyCaughtPokemonsList_trainer";

type PropsType = {
  trainer: ?RecentlyCaughtPokemonsList_trainer,
  relay?: {
    hasMore: () => boolean,
    isLoading: () => boolean,
    loadMore: (number, (Error) => void) => void,
  },
};

type StateType = {
  error: ?Error,
};

class RecentlyCaughtPokemonsList extends React.Component<PropsType, StateType> {
  state = {
    error: null,
  };

  hasMore = () => (this.props.relay ? this.props.relay.hasMore() : false);
  loadMore = moreNumber =>
    this.props.relay
      ? this.props.relay.loadMore(moreNumber, this.handleCompleted)
      : null;
  isLoading = () => (this.props.relay ? this.props.relay.isLoading() : false);

  handleLoadMore = () => {
    if (!this.hasMore() || this.isLoading()) {
      return;
    }

    this.setState({ error: null }, () => this.loadMore(5));
  };

  handleCompleted = error => {
    if (error) {
      this.setState({ error });
    }
  };

  maybeRenderLoadMoreButton = () =>
    this.hasMore() ? (
      <SimpleButton
        fullWidth
        IconComponent={ExpandMore}
        onClick={this.handleLoadMore}
      >
        Load more
      </SimpleButton>
    ) : null;

  maybeRenderErrorMessage = () =>
    this.state.error ? <ErrorMessage error={this.state.error} /> : null;

  render() {
    if (this.props.trainer) {
      const pokemons = this.props.trainer.pokemons.edges.map(edge => edge.node);
      return (
        // $FlowFixMe: Sisyphean task
        <React.Fragment>
          <PokemonsList pokemons={pokemons} />
          {this.maybeRenderErrorMessage()}
          {this.maybeRenderLoadMoreButton()}
        </React.Fragment>
      );
    } else {
      return <WarnMessage error={new Error("You're not a trainer.")} />;
    }
  }
}

export default createPaginationContainer(
  RecentlyCaughtPokemonsList,
  {
    trainer: graphql`
      fragment RecentlyCaughtPokemonsList_trainer on Trainer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 5 }
          cursor: { type: "String" }
        ) {
        id
        pokemons(first: $count, after: $cursor)
          @connection(key: "RecentlyCaughtPokemonsList_pokemons") {
          edges {
            node {
              id
              ...PokemonsList_pokemons
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps: props => props.trainer && props.trainer.pokemons,
    getVariables: (props, { count, cursor }) => ({
      count,
      cursor,
      trainerID: props.trainer.id,
    }),
    query: graphql`
      query RecentlyCaughtPokemonsListPaginationQuery(
        $count: Int!
        $cursor: String
        $trainerID: ID!
      ) {
        trainer: node(id: $trainerID) {
          ...RecentlyCaughtPokemonsList_trainer
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  },
);
