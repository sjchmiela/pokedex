// @flow

import * as React from "react";
import Grid from "material-ui/Grid";
import List from "material-ui/List/List";
import type { Disposable } from "react-relay";
// $FlowFixMe: no ConnectionHandler in the stub
import { ConnectionHandler } from "relay-runtime";
import { graphql, requestSubscription } from "react-relay";

import PaperSheet from "../atoms/PaperSheet";
import EventRow from "../molecules/EventRow";
import withRelayData from "../services/withRelayData";
import withRelayEnvironmentContext from "../services/withRelayEnvironmentContext";

import FeedPageQuery from "./__generated__/FeedPageQuery";

const subscription = graphql`
  subscription FeedPageSubscription {
    eventsFeed {
      id
      ...EventRow_event
    }
  }
`;

class FeedPage extends React.Component<FeedPageQuery> {
  subscription: Disposable;

  componentDidMount = () => {
    this.createSubscription();
  };

  componentWillUnmount = () => {
    if (this.subscription) {
      this.subscription.dispose();
    }
  };

  createSubscription = () => {
    this.subscription = requestSubscription(this.props.environment, {
      subscription,
      updater: store => {
        const rootField = store.getRootField("eventsFeed");
        const viewer = store.getRoot().getLinkedRecord("viewer");
        // $FlowFixMe: no ConnectionHandler in the stub
        const events = ConnectionHandler.getConnection(viewer, "feed_events");
        // $FlowFixMe: no ConnectionHandler in the stub
        const edge = ConnectionHandler.createEdge(
          store,
          events,
          rootField,
          "EventEdge",
        );
        // $FlowFixMe: no ConnectionHandler in the stub
        ConnectionHandler.insertEdgeBefore(events, edge);
      },
    });
  };

  renderFeed = () => (
    <Grid item xs={12} sm={8} md={6} lg={8} xl={4}>
      <PaperSheet headline="Event Feed">
        <List>
          {this.props.viewer.events.edges.map(edge => (
            <EventRow key={edge.node.id} event={edge.node} />
          ))}
        </List>
      </PaperSheet>
    </Grid>
  );

  render() {
    return (
      <Grid container justify="center">
        {this.renderFeed()}
      </Grid>
    );
  }
}

export default withRelayEnvironmentContext(
  withRelayData(
    FeedPage,
    graphql`
      query FeedPageQuery {
        viewer {
          id
          events(first: 5) @connection(key: "feed_events") {
            edges {
              node {
                id
                ...EventRow_event
              }
            }
          }
        }
      }
    `,
  ),
);
