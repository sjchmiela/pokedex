// @flow

import * as React from "react";
import Grid from "material-ui/Grid";
import { graphql } from "react-relay";

import List from "material-ui/List/List";

import PaperSheet from "../atoms/PaperSheet";
import EventRow from "../molecules/EventRow";
import withRelayData from "../services/withRelayData";
import withRelayEnvironmentContext from "../services/withRelayEnvironmentContext";

import FeedPageQuery from "./__generated__/FeedPageQuery";

type EventEdgeType = {
  node: {
    id: string,
    at: {
      iso8601: string,
    },
  },
};

class FeedPage extends React.Component<FeedPageQuery> {
  renderFeed = (events: Array<EventEdgeType>) => (
    <Grid item xs={12} sm={8} md={6} lg={8} xl={4}>
      <PaperSheet headline="Event Feed">
        <List>
          {events.map(edge => (
            <EventRow key={edge.node.id} event={edge.node} />
          ))}
        </List>
      </PaperSheet>
    </Grid>
  );

  render() {
    // STEP 13
    // We now receive events properly sorted by the backend,
    // so we can get rid of this .sort call. We should also
    // assign a different prop to events constant.
    // Where are we going to be able to find the edges now?

    const events = [
      ...this.props.viewer.caughtEvents.edges,
      ...this.props.viewer.releaseEvents.edges,
    ].sort(
      (a: EventEdgeType, b: EventEdgeType): boolean =>
        new Date(a.node.at.iso8601) < new Date(b.node.at.iso8601),
    );

    // STEP 14
    // If you'd look at the feed page right now, you would notice
    // that the events are sorted old-first. That doesn't look right.
    // Let's reverse the array's order.
    //
    // Note that the array that Relay provides us with is immutable
    // and `reverse()` mutates the array that it is called upon,
    // so we will have to copy the array before reversing.
    // To copy JS array use `.slice()` method on the array.

    return (
      <Grid container justify="center">
        {this.renderFeed(events)}
      </Grid>
    );
  }
}

// STEP 11
// Make sure you've got an up-to-date schema.json
// by running mix graphql.schema and restarting the Phoenix server.

// STEP 12
// Let's finally get rid of those two ugly connections!
// Replace the releaseEvents and caughtEvents connections
// with a single events connection that will query
// exactly the same fields as are queried right now
// (id, at.iso8601 and typename: __typename).
//
// Include the inline fragments of the concrete EventRows
// in the node field. As these will be applied only on matching
// types, eg. EventReleasedRow_event fragment will be fulfilled only
// when the Events implementation is EventReleased.

export default withRelayEnvironmentContext(
  withRelayData(
    FeedPage,
    graphql`
      query FeedPageQuery {
        viewer {
          id
          releaseEvents(first: 5) {
            edges {
              node {
                id
                at {
                  iso8601
                }
                typename: __typename
                ...EventReleasedRow_event
              }
            }
          }

          caughtEvents(first: 5) {
            edges {
              node {
                id
                at {
                  iso8601
                }
                typename: __typename
                ...EventCaughtRow_event
              }
            }
          }
        }
      }
    `,
  ),
);

// STEP 20
// We've defined Relay data requirements for EventRow,
// so we can remove obsolete data requirements here.
//
// Note that apart from the EventRow_event fragment,
// this component uses one property of Event.
// Don't forget to leave it defined or you'll get an error message
// from React saying that you cannot have two childs with the same
// key `undefined`.
//
// Have I said too much?
