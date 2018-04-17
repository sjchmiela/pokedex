// // @flow

// // STEP 16
// // Uncomment this file by selecting it all and... uncommenting (at least VS Code)
// // can handle uncommenting such commented block with one command.
// // Notice that at the moment SpeciesList isn't aware that it
// // is using data from a connection. That's a good thing!
// // Concerns are separated nicely between several components.
// //
// // We'll provide you with a connection ready component that can
// // handle pagination itself. We find this part quite complex
// // and as hard JS coding isn't really a part of this workshop
// // we'll skip the beauty of it.
// //
// // Let's walk through the code.

// import * as React from "react";

// import ExpandMore from "@material-ui/icons/ExpandMore";
// import { graphql, createPaginationContainer } from "react-relay";

// import SimpleButton from "../atoms/SimpleButton";
// import ErrorMessage from "../atoms/ErrorMessage";
// import SpeciesList from "../organisms/SpeciesList";

// import ConnectionSpeciesList_query from "./__generated__/ConnectionSpeciesList_query";

// type PropsType = {
//   searchTerm?: string,
//   query: ?ConnectionSpeciesList_query,
//   relay?: {
//     hasMore: () => boolean,
//     isLoading: () => boolean,
//     loadMore: (number, (Error) => void) => void,
//   },
// };

// type StateType = {
//   error: ?Error,
// };

// class ConnectionSpeciesList extends React.Component<PropsType, StateType> {
//   state = {
//     error: null,
//   };

//   // STEP 17
//   // Notice these three methods. Sorry for the ternary operators (?:), they appease Flow.
//   //
//   // What we would like you to notice here is that there is a relay prop
//   // passed to our component that provides it with three interesting methods:
//   // * hasMore(), returning a boolean. It obviously returns information whether
//   //   connection has any more edges. How does it know about this? Is it magic?
//   //   No! If you'd go back to GraphiQL and inspect the SpeciesConnection type,
//   //   you would notice that apart from edges it can provide a PageInfo object,
//   //   which has four properties, one of which is hasNextPage. Relay connection handler
//   //   fetches PageInfo so it is able to answer a question "does the connection have
//   //   any more objects?"
//   // * loadMore(moreCount, callback) is a method that tells Relay to fetch moreCount
//   //   more objects from the connection. Callback is called when the request finishes.
//   // * isLoading(): boolean returns whether Relay is loading more data at the moment.
//   // Reference: https://facebook.github.io/relay/docs/en/pagination-container.html#hasmore
//   hasMore = () => (this.props.relay ? this.props.relay.hasMore() : false);
//   loadMore = moreNumber =>
//     this.props.relay
//       ? this.props.relay.loadMore(moreNumber, this.handleCompleted)
//       : null;
//   isLoading = () => (this.props.relay ? this.props.relay.isLoading() : false);

//   handleLoadMore = () => {
//     if (!this.hasMore() || this.isLoading()) {
//       return;
//     }

//     this.setState({ error: null }, () => this.loadMore(20));
//   };

//   handleCompleted = error => {
//     if (error) {
//       this.setState({ error });
//     }
//   };

//   maybeRenderLoadMoreButton = () =>
//     this.hasMore() ? (
//       <SimpleButton
//         fullWidth
//         IconComponent={ExpandMore}
//         onClick={this.handleLoadMore}
//       >
//         Load more
//       </SimpleButton>
//     ) : null;

//   maybeRenderErrorMessage = () =>
//     this.state.error ? <ErrorMessage error={this.state.error} /> : null;

//   render() {
//     // STEP 18
//     // Just as we did in ApplicationDrawer's QueryRenderer, here we also
//     // have to process the incoming data and provide SpeciesList with
//     // prepared list of species.
//     const species = this.props.query.species.edges.map(edge => edge.node);
//     return (
//       // $FlowFixMe: Sisyphean task
//       <React.Fragment>
//         <SpeciesList species={species} />
//         {this.maybeRenderLoadMoreButton()}
//         {this.maybeRenderErrorMessage()}
//       </React.Fragment>
//     );
//   }
// }

// // STEP 19
// // Notice that the pagination container is created just like
// // the fragment container, we create a Higher-Order-Component
// // with a helper function.
// // https://reactjs.org/docs/higher-order-components.html
// export default createPaginationContainer(
//   ConnectionSpeciesList,
//   {
//     query: graphql`
//       fragment ConnectionSpeciesList_query on RootQueryType
//         # STEP 20
//         # For connections to work properly in GraphQL
//         # we need to provide them with several arguments.
//         @argumentDefinitions(
//           count: { type: "Int", defaultValue: 20 }
//           cursor: { type: "String" }
//           # STEP 27
//           # Add a new argument definition for our searchTerm of type String
//         ) {
//         species(
//           # STEP 21
//           # Arguments are then used as connection arguments.
//           first: $count
//           after: $cursor
//           # STEP 28
//           # Add a new searchTerm argument
//         ) @connection(key: "ConnectionSpeciesList_species") {
//           edges {
//             node {
//               id
//               ...SpeciesList_species
//             }
//           }
//         }
//       }
//     `,
//   },
//   {
//     direction: "forward",
//     getConnectionFromProps: props => props.query && props.query.species,
//     // STEP 22
//     // getVariables function defines how to get arguments we defined
//     // in @argumentDefinitions from props and pagination state when loading more
//     // edges.
//     getVariables: (props, { count, cursor }) => ({
//       count,
//       cursor,
//       // STEP 32
//       // Get searchTerm from props and add to this object under searchTerm key
//     }),
//     // STEP 23
//     // The following query defines how to query for more edges.
//     // It is provided with proper arguments and is pretty straightforward,
//     // as it only contains ConnectionSpeciesList_query fragment.
//     query: graphql`
//       query ConnectionSpeciesListPaginationQuery(
//         $count: Int!
//         $cursor: String
//         # STEP 33
//         # Add a new searchTerm argument of type String
//       ) {
//         # STEP 34
//         # Pass all the three arguments to the inline fragment
//         # (add the searchTerm one)
//         ...ConnectionSpeciesList_query @arguments(count: $count, cursor: $cursor)
//       }
//     `,
//   },
// );

// // STEP 24
// // Notice that although we can now easily load more Pokemon species,
// // we still can't search the catalogue reliably -- it's the frontend
// // who performs the search and as it does not have all the Pokemons
// // names, it cannot search the whole database.
// //
// // Let's fix it!
