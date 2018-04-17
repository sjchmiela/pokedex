// @flow

import * as React from "react";
import Hidden from "material-ui/Hidden";
import { throttle } from "throttle-debounce";
import type { ReadyState } from "react-relay";
import { graphql, QueryRenderer } from "react-relay";

import SearchField from "../atoms/SearchField";
import ApplicationBar from "../molecules/ApplicationBar";

// STEP 14
// Let's use a connection-aware Relay
// Import ConnectionSpeciesList from ../organisms/ConnectionSpeciesList.
// You can remove the SpeciesList import.
import SpeciesList from "../organisms/SpeciesList";

import {
  SimpleButtons,
  BottomNavigation,
} from "../molecules/ApplicationNavigation";
import ResponsiveDrawer from "../molecules/ResponsiveDrawer";

import createRelayEnvironment from "../services/createRelayEnvironment";

const environment = createRelayEnvironment();

type PropsType = {
  children?: ?React.Node,
};

type StateType = {
  speciesListSearchTerm: ?string,
};

// STEP 13
// Let's use our species connection to render the species list.
// Remember to run mix graphql.schema and restart the server!
//
// Change `speciesArray` into `species(first: 15)` and nest
// ...SpeciesList_species inside `edges { node {} }`.
// To pass the new species list to <SpeciesList /> component
// you will need to also change how the species prop is passed
// in there (readyState.props.speciesArray is no longet available),
// instead you can use readyState.props.species.edges.map(edge => edge.node)
// to change list of edges into list of species nodes.
//
// After this update a list of 15 Pokemon species should render in the application drawer.

const ConnectedSpeciesList = props => (
  <QueryRenderer
    {...props}
    // STEP 31
    // As we are already receiving the searchTerm
    // in props, let's include the term in variables,
    // so it is passed to the GraphQL query.
    variables={{}}
    environment={environment}
    query={graphql`
      # STEP 29
      # Add an argument to the ApplicationDrawerQuery, eg. ($searchTerm: String)
      query ApplicationDrawerQuery {
        speciesArray {
          ...SpeciesList_species
        }
        # STEP 30
        # Pass the searchTerm argument to the query fragment
        # with @arguments(name: $value) annotation
      }
    `}
    render={(readyState: ReadyState) => {
      if (readyState.error) {
        return <p>Error</p>;
      }
      if (!readyState.props) {
        return <p>Loading</p>;
      }
      // STEP 15
      // Change SpeciesList to ConnectionSpeciesList. Pass in readyState.props
      // as the query prop. Also please change the content of ApplicationDrawerQuery
      // to spread ...ConnectionSpeciesList_query on query level.
      return <SpeciesList {...props} species={readyState.props.speciesArray} />;
    }}
  />
);

export default class ApplicationDrawer extends React.PureComponent<
  PropsType,
  StateType,
> {
  throttledSetState: StateType => void;
  constructor(props: PropsType) {
    super(props);
    this.throttledSetState = throttle(500, this.setState);
    this.state = { speciesListSearchTerm: null };
  }

  renderAppBar = (props: {
    className: string,
    menuIconClassName: string,
    onDrawerToggle: () => void,
  }): React.Node => (
    <ApplicationBar {...props}>
      <Hidden xsDown>
        <SimpleButtons />
      </Hidden>
    </ApplicationBar>
  );

  renderSearchField = () => (
    <SearchField
      onChange={speciesListSearchTerm =>
        this.throttledSetState({ speciesListSearchTerm })
      }
    />
  );

  renderSpeciesList = () => (
    <ConnectedSpeciesList searchTerm={this.state.speciesListSearchTerm} />
  );

  renderBottomNavigation = (props: Object) => (
    <Hidden smUp>
      <BottomNavigation {...props} />
    </Hidden>
  );

  render() {
    return (
      <ResponsiveDrawer
        renderAppBar={this.renderAppBar}
        renderDrawerHeader={this.renderSearchField}
        renderDrawerContent={this.renderSpeciesList}
        renderBottomNavigation={this.renderBottomNavigation}
      >
        {this.props.children}
      </ResponsiveDrawer>
    );
  }
}
