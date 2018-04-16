// @flow

import * as React from "react";
import { graphql } from "react-relay";
import Hidden from "material-ui/Hidden";
import { throttle } from "throttle-debounce";
import ExitToApp from "@material-ui/icons/ExitToApp";

import SearchField from "../atoms/SearchField";
import SimpleButton from "../atoms/SimpleButton";
import withRelayData from "../services/withRelayData";
import ApplicationBar from "../molecules/ApplicationBar";
import {
  SimpleButtons,
  BottomNavigation,
} from "../molecules/ApplicationNavigation";
import ResponsiveDrawer from "../molecules/ResponsiveDrawer";
import ConnectionSpeciesList from "../organisms/ConnectionSpeciesList";
import withRelayEnvironmentContext from "../services/withRelayEnvironmentContext";
import type { ContextType } from "../services/withRelayEnvironmentContext";

import ApplicationDrawerQuery from "./__generated__/ApplicationDrawerQuery";

type PropsType = ContextType & {
  children?: ?React.Node,
};

type StateType = {
  speciesListSearchTerm: ?string,
};

const query = graphql`
  query ApplicationDrawerQuery($searchTerm: String) {
    me {
      id
    }
    ...ConnectionSpeciesList_query @arguments(searchTerm: $searchTerm)
  }
`;

const ConnectedSpeciesList = withRelayData(
  (props: ApplicationDrawerQuery & Object) => (
    <ConnectionSpeciesList {...props} query={props} />
  ),
  query,
);

const SignOutButton = ({ onClick }: () => void) => (
  <SimpleButton IconComponent={ExitToApp} onClick={onClick}>
    Sign out
  </SimpleButton>
);

const ConnectedSignOutButton = withRelayData(
  (props: ApplicationDrawerQuery) =>
    props.me ? <SignOutButton {...props} /> : null,
  query,
  null,
  { renderLoading: false },
);

class ApplicationDrawer extends React.PureComponent<PropsType, StateType> {
  throttledSetState: StateType => void;
  constructor(props) {
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
      <ConnectedSignOutButton onClick={() => this.props.setToken(null)} />
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
    <ConnectedSpeciesList
      variables={{ searchTerm: this.state.speciesListSearchTerm }}
    />
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

export default withRelayEnvironmentContext(ApplicationDrawer);
