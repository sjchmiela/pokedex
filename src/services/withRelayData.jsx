// @flow

import * as React from "react";
import { QueryRenderer as RRQueryRenderer } from "react-relay";
import type { Variables, GraphQLTaggedNode, ReadyState } from "react-relay";

import { withStyles } from "material-ui/styles";
import Refresh from "@material-ui/icons/Refresh";
import blue from "material-ui/colors/blue";

import Loading from "../atoms/Loading";
import ErrorMessage from "../atoms/ErrorMessage";
import SimpleButton from "../atoms/SimpleButton";
import RelayEnvironmentContext from "./RelayEnvironmentContext";

const styles = theme => ({
  container: {
    margin: theme.spacing.unit * 2,
  },
  retryButton: {
    marginTop: theme.spacing.unit,
    backgroundColor: blue[500],
    color: theme.palette.common.white, // xD
    "&:hover": {
      backgroundColor: blue[400],
    },
  },
});

type WithRelayDataPropsType = {
  variables: ?Variables,
  classes: { container: string, retryButton: string },
};

export default function withRelayData(
  WrappedComponent: React.ComponentType<Object>,
  query: GraphQLTaggedNode,
  rootVariables: ?Variables,
  config: ?{ renderLoading: boolean },
) {
  class WithRelayData extends React.PureComponent<WithRelayDataPropsType> {
    maybeRenderRetryButton = (readyState: ReadyState): ?React.Node =>
      readyState.retry ? (
        <SimpleButton
          fullWidth
          IconComponent={Refresh}
          onClick={readyState.retry}
          className={this.props.classes.retryButton}
        >
          Retry
        </SimpleButton>
      ) : null;

    renderContent = (readyState: ReadyState): React.Element<*> => {
      if (readyState.error) {
        return (
          <div className={this.props.classes.container}>
            <ErrorMessage error={readyState.error} />
            {this.maybeRenderRetryButton(readyState)}
          </div>
        );
      }

      if (readyState.props) {
        const { classes, ...props } = this.props;
        return <WrappedComponent {...readyState.props} {...props} />;
      }

      if (!config || config.renderLoading)
        return (
          <div className={this.props.classes.container}>
            <Loading />
          </div>
        );

      return <div />;
    };

    render() {
      let render = this.renderContent;

      const { classes, variables, ...customProps } = this.props;

      if (customProps) {
        // WithRelayData component doesn't expect any props by itself.
        // If it receives any props, they are expected to be passed down
        // to the WrappedComponent instance. And since RRQueryRenderer
        // wouldn't know it has to rerender, let's hack it by recreating the render
        // function on each render. :(
        render = (readyState: ReadyState): React.Element<*> =>
          this.renderContent(readyState);
      }

      return (
        <RelayEnvironmentContext.Consumer>
          {({ environment }) => (
            <RRQueryRenderer
              query={query}
              render={render}
              environment={environment}
              variables={{ ...rootVariables, ...variables }}
            />
          )}
        </RelayEnvironmentContext.Consumer>
      );
    }
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  WithRelayData.displayName = `WithRelayData(${displayName})`;

  return withStyles(styles)(WithRelayData);
}
