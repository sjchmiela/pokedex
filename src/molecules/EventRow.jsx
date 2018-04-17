// @flow

import moment from "moment";
import * as React from "react";

// STEP 16
// Import graphql and createFragmentContainer from among
// export of react-relay.

import { withStyles } from "material-ui/styles";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";

import EventCaughtRow from "../molecules/EventCaughtRow";
import EventReleasedRow from "../molecules/EventReleasedRow";

const styles = theme => ({
  container: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
      alignItems: "stretch",
    },
  },
  timeLabel: {
    flex: 1,
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing.unit,
      marginLeft: theme.spacing.unit * 7,
    },
  },
  concreteEvent: {
    flex: 5,
    display: "flex",
  },
});

type EventType = {
  typename: string,
  at: {
    iso8601: string,
  },
};

// STEP 15
// Notice that EventRow uses and requires certain fields
// of the Event interface, but it doesn't specify any GraphQL fragment
// that parent containers could use to include EventRow's fragment
// in their query.
//
// Let's make EventRow a Relay fragment container.

// // If you're using Flow
// // STEP 19
// // Relay watcher should automatically create an importable
// // type definition for us. Import it from the __generated__
// // directory and use as the type that props.event is expected to be.
// // Once you do this, also fix the type required by renderConcreteEvent.
// // Then you can also remove the obsolete EventType -- now the type
// // is always up to date thanks to Relay watcher.

type PropsType = {
  event: EventType,
  classes: { container: string, timeLabel: string, concreteEvent: string },
};

class EventRow extends React.Component<PropsType> {
  renderConcreteEvent = (event: EventType) => {
    switch (event.typename) {
      case "EventCaught":
        return <EventCaughtRow event={event} />;
      case "EventReleased":
        return <EventReleasedRow event={event} />;
    }
  };

  render() {
    return (
      <ListItem disableGutters className={this.props.classes.container}>
        <ListItemText
          className={this.props.classes.timeLabel}
          secondary={moment(this.props.event.at.iso8601).fromNow()}
        />
        <div className={this.props.classes.concreteEvent}>
          {this.renderConcreteEvent(this.props.event)}
        </div>
      </ListItem>
    );
  }
}

// STEP 17
// Instead of exporting, assign the exported value to some constant.
export default withStyles(styles)(EventRow);

// STEP 18
// Define and export by default a newly created fragment container.
// createFragmentContainer should fetch a single fragment named eg. event,
// and it should define this fragment on Event type.
// The funny thing is, you can just copy the contents of
// the query defined on `node` from FeedRow -- that's exactly what
// EventRow needs and that's why we're moving the fragment
// here -- so that data requirements are colocated with the component
// using them.
