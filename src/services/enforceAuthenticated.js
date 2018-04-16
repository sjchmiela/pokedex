// @flow

import * as React from "react";
import { graphql } from "react-relay";
import { withRouter } from "react-router-dom";

import withRelayData from "../services/withRelayData";

export function enforceAuthenticated(
  WrappedComponent: React.ComponentType<Object>,
) {
  class Authenticated extends React.PureComponent<Object> {
    componentDidMount() {
      this.maybeRedirect();
    }

    componentDidUpdate() {
      this.maybeRedirect();
    }

    maybeRedirect = () => !this.props.me && this.props.history.push("/sign_in");

    render() {
      const { me, ...rest } = this.props;
      if (me) {
        return <WrappedComponent {...rest} />;
      }

      return null;
    }
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  Authenticated.displayName = `Authenticated(${displayName})`;

  const AuthenticatedWithRelayData = withRelayData(
    Authenticated,
    graphql`
      query enforceAuthenticatedQuery {
        me {
          id
        }
      }
    `,
  );

  return withRouter(AuthenticatedWithRelayData);
}
