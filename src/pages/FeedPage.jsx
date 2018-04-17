// @flow

import * as React from "react";
import Grid from "material-ui/Grid";
import { graphql } from "react-relay";

// STEP 15
// Let's make this component a real-time live feed component!
// Firstly we need to import requestSubscription function from
// among exports of react-relay.

// STEP 18
// It's nice we log some object to the console, but we would
// really like the list to update with a new row with event.
// Let's import ConnectionHandler from among exports of relay-runtime.
// // If using Flow, add $FlowFixMe comment over the line.

import List from "material-ui/List/List";

import PaperSheet from "../atoms/PaperSheet";
import EventRow from "../molecules/EventRow";
import withRelayData from "../services/withRelayData";
import withRelayEnvironmentContext from "../services/withRelayEnvironmentContext";

import FeedPageQuery from "./__generated__/FeedPageQuery";

// STEP 16
// Let's define the subscription document that we will subscribe with.
// Use graphql`` macro to define a FeedPageSubscription subscription document.
// You can use ...EventRow_event fragment to spread event data requirements
// of the component in the subscription.

// If the relay watcher complains, run mix graphql.schema to regenerate the JSON schema
// and restart the server.

class FeedPage extends React.Component<FeedPageQuery> {
  // STEP 17
  // Let's create a function that will request a new subscription
  // with the environment provided in this.props.environment
  // and document created in the previous step.
  // For inspiration go to https://facebook.github.io/relay/docs/en/subscriptions.html#example.
  // Add `onNext: console.log` argument to the object
  // - second argument to the requestSubscription function.
  //
  // Add componentDidMount callback to this component class
  // and assign result of this.createSubscription() call to
  // this.subscription.
  //
  // Then, add componentWillUnmount callback that will
  // check if this.subscription is truthy, and if it is,
  // it will call .dispose() on it and set it to null.
  //
  // // If using Flow, import type Disposable from react-relay and add
  // // Flow type definition for instance property
  // // subscription: ?Disposable
  //
  // You should see in your browser's console an Object being logged when
  // a mutation is triggered in other tab (and this tab in showing Feed page).

  // STEP 19
  // Unfortunately Relay won't be able to update our events connection itself.
  // It's left up to the developers to implement the updater. (Fortunately,
  // when updating fields' values of a Node object of a given ID, Relay
  // is able to infer the update itself, which is not the case
  // when it comes to connections.)
  // Updater function receives store as the argument.
  // Store provides a couple of functions that will come in handy:
  // * getRootField(string) -- returns a field of a given document (in our case
  //   we will use getRootField("eventsFeed") to get the field of our subscription document),
  // * getRoot() -- returns a store root, which provides us with a
  //   * getLinkedRecord(string) -- method to get the linked record of a given name.
  //     Linked record represents stored value of a corresponding query. We will only use
  //     getLinkedRecord("viewer") to get the query.viewer value.
  // Now we know how to fetch given stores from the Relay Store, but how to update it?
  // That's where we use ConnectionHandler imported in step 18.
  // * getConnection(linkedRecord, string) -- returns connection store for a given string
  //   under a given linked record.
  // * createEdge(store, connection, rootField, edgeTypeName) -- creates an edge of the connection
  //   compliant with the store, expecting new node of edgeTypeName in rootField.
  // * insertEdgeBefore(connection, edge) -- prepends the connection with the edge.
  //
  // Try to implement an updater function, receiving store as an argument,
  // inserting edge from the "eventsFeed" rootField to an "events_feed" connection
  // of "viewer" linked record. (Note that our edge is of type "EventEdge").
  //
  // // If you're using Flow, you'll have to add $FlowFixMe comment
  // // to every line using ConnectionHandler. :(

  // STEP 20
  // Remove the onNext function from the config and run some
  // catchPokemon or releasePokemon mutations with this component open in other tab
  // to see it updating live.

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
