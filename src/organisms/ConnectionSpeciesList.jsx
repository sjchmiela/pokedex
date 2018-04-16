// @flow

import * as React from "react";

import ExpandMore from "@material-ui/icons/ExpandMore";
import { graphql, createPaginationContainer } from "react-relay";

import WarnMessage from "../atoms/WarnMessage";
import SimpleButton from "../atoms/SimpleButton";
import ErrorMessage from "../atoms/ErrorMessage";
import SpeciesList from "../organisms/SpeciesList";

import ConnectionSpeciesList_query from "./__generated__/ConnectionSpeciesList_query";

type PropsType = {
  searchTerm?: string,
  query: ?ConnectionSpeciesList_query,
  relay?: {
    hasMore: () => boolean,
    isLoading: () => boolean,
    loadMore: (number, (Error) => void) => void,
  },
};

type StateType = {
  error: ?Error,
};

class ConnectionSpeciesList extends React.Component<PropsType, StateType> {
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

    this.setState({ error: null }, () => this.loadMore(20));
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
    if (this.props.query) {
      const species = this.props.query.species.edges.map(edge => edge.node);
      return (
        // $FlowFixMe: Sisyphean task
        <React.Fragment>
          <SpeciesList
            species={species}
            searchTerm={this.props.searchTerm}
            onLoadMore={this.handleLoadMore}
          />
          {this.maybeRenderErrorMessage()}
        </React.Fragment>
      );
    } else {
      return <WarnMessage error={new Error("You're not a trainer.")} />;
    }
  }
}

export default createPaginationContainer(
  ConnectionSpeciesList,
  {
    query: graphql`
      fragment ConnectionSpeciesList_query on RootQueryType
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 20 }
          cursor: { type: "String" }
          searchTerm: { type: "String" }
        ) {
        species(first: $count, after: $cursor, searchTerm: $searchTerm)
          @connection(key: "ConnectionSpeciesList_species") {
          edges {
            node {
              id
              ...SpeciesList_species
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps: props => props.query && props.query.species,
    getVariables: (props, { count, cursor }) => ({
      count,
      cursor,
      searchTerm: props.variables.searchTerm,
    }),
    query: graphql`
      query ConnectionSpeciesListPaginationQuery(
        $count: Int!
        $cursor: String
        $searchTerm: String
      ) {
        ...ConnectionSpeciesList_query
          @arguments(count: $count, cursor: $cursor, searchTerm: $searchTerm)
      }
    `,
  },
);
