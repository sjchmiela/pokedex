// @flow

import * as React from "react";
import Hidden from "material-ui/Hidden";
import { throttle } from "throttle-debounce";

import SpeciesList from "../organisms/SpeciesList";
import SearchField from "../atoms/SearchField";
import ApplicationBar from "../molecules/ApplicationBar";
import {
  SimpleButtons,
  BottomNavigation,
} from "../molecules/ApplicationNavigation";
import ResponsiveDrawer from "../molecules/ResponsiveDrawer";

// STEP 16
// We need to import:
// * from "react-relay":
//   * { graphql } - to denote GraphQL queries
//   * { QueryRenderer } - to fetch data from GraphQL server and pass it down
//     (https://facebook.github.io/relay/docs/en/query-renderer.html)
//   * type { ReadyState } - for Flow typing
// * from "../services/createRelayEnvironment":
// createRelayEnvironment - function already prepared by us,
//   that creates [Relay Enviornment](https://facebook.github.io/relay/docs/en/relay-environment.html)

// STEP 17
// Create constant to store the instance of Relay Environment

type PropsType = {
  children?: ?React.Node,
};

type StateType = {
  speciesListSearchTerm: ?string,
};

// STEP 18
// Remove `mockedSpecies` and `MockedSpeciesList`

// STEP 19
// Implement `ConnectedSpeciesList` as a simplified React Component i.e. function that takes
// props as the only argument. It should return an instance of `QueryRenderer`. To build it pass as props:
// * props from the upper component `{...props}`
// * variables - {} (we won't use variables for now)
// * environment - Relay Environment instance created in step 17
// * query - query named `ApplicationDrawerQuery` that uses fragment defined in step 15.
//   To reference fragment use ...fragmentName_item.
// * render - a function that takes one argument of type `ReadyState` and returns:
// * * null - when `readyState.props` is falsey
// * * an instance of `SpeciesList`, to which you pass the props taken by `ConnectedSpeciesList`.

// STEP 21
// Change the render function of the `QueryRenderer` so that it
// * returns e.g. `<p>Error</p>` when `readyState.error` is truthy
// * returns e.g. `<p>Loading</p>` when `readyState.props` is falsey

const mockedSpecies = [
  {
    id: "mock1",
    name: "abc",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
  },
  {
    id: "mock2",
    name: "def",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
  },
];

const MockedSpeciesList = props => (
  <SpeciesList {...props} species={mockedSpecies} />
);

export default class ApplicationDrawer extends React.PureComponent<
  PropsType,
  StateType,
> {
  throttledSetState: StateType => void;
  constructor(props: PropsType) {
    super(props);
    this.throttledSetState = throttle(500, this.setState);
    this.state = {
      speciesListSearchTerm: null,
    };
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
    // STEP 20
    // Replace `MockedSpeciesList` with `ConnectedSpeciesList`
    // You should see the list of 100 pokemons in the drawer (http://localhost:4000)
    <MockedSpeciesList searchTerm={this.state.speciesListSearchTerm} />
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
