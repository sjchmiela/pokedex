// @flow

import * as React from "react";
import { graphql } from "react-relay";
import { withRouter } from "react-router-dom";

import withRelayData from "../services/withRelayData";

export function enforceUnauthenticated(
  WrappedComponent: React.ComponentType<Object>,
) {
  class Unauthenticated extends React.PureComponent<Object> {
    componentDidMount() {
      this.maybeRedirect();
    }

    componentDidUpdate() {
      this.maybeRedirect();
    }

    maybeRedirect = () => {
      this.props.me && this.props.history.push("/");
    };

    render() {
      const { me, ...rest } = this.props;
      if (!me) {
        return <WrappedComponent {...rest} />;
      }

      return null;
    }
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  Unauthenticated.displayName = `Unauthenticated(${displayName})`;

  const UnauthenticatedWithRelayData = withRelayData(
    Unauthenticated,
    graphql`
      query enforceUnauthenticatedQuery {
        me {
          id
        }
      }
    `,
  );

  return withRouter(UnauthenticatedWithRelayData);
}
