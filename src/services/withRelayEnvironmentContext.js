// @flow

import * as React from "react";
import RelayEnvironmentContext from "../services/RelayEnvironmentContext";
import type { ContextType as BaseContextType } from "../services/RelayEnvironmentContext";

export type ContextType = BaseContextType;

export default function withRelayEnvironmentContext<P>(
  // $FlowFixMe: this used to work.
  WrappedComponent: React.ComponentType<{ ...ContextType, ...P }>,
): React.ComponentType<P> {
  class WithRelayEnvironmentContext extends React.PureComponent<P> {
    render() {
      return (
        <RelayEnvironmentContext.Consumer>
          {(context: ContextType) => (
            <WrappedComponent {...context} {...this.props} />
          )}
        </RelayEnvironmentContext.Consumer>
      );
    }
  }

  return WithRelayEnvironmentContext;
}
