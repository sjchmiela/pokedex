// @flow

import * as React from "react";
import type { Environment } from "relay-runtime";
import TokenStore from "../services/AuthenticationTokenStore";
import createRelayEnvironment from "../services/createRelayEnvironment";

export type ContextType = {
  environment: Environment,
  setToken: (?string) => void,
};

// https://github.com/facebook/flow/commit/b83e553abcce4b73bac16ff1826c04ae0443ec19
// $FlowFixMe: will fix itself
const RelayEnvironmentContext = React.createContext({
  evironment: null,
  setToken: () => {},
});

type PropsType = { children: React.Node };

class RelayEnvironmentContextManager extends React.Component<
  PropsType,
  ContextType,
> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      environment: createRelayEnvironment(TokenStore.getToken()),
      setToken: this.setToken,
    };
  }

  setToken = (token: ?string) => {
    if (token) {
      TokenStore.setToken(token);
    } else {
      TokenStore.clearToken();
    }

    this.setState({
      environment: createRelayEnvironment(token),
    });
  };

  render() {
    return (
      <RelayEnvironmentContext.Provider value={this.state}>
        {this.props.children}
      </RelayEnvironmentContext.Provider>
    );
  }
}

RelayEnvironmentContext.Manager = RelayEnvironmentContextManager;

export default RelayEnvironmentContext;
