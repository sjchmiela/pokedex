// @flow

import moment from "moment";
import * as React from "react";
import { withStyles } from "material-ui/styles";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import { createFragmentContainer, graphql } from "react-relay";

import EventCaughtRow from "../molecules/EventCaughtRow";
import EventReleasedRow from "../molecules/EventReleasedRow";

import EventRow_event from "./__generated__/EventRow_event";

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

type PropsType = {
  event: EventRow_event,
  classes: { container: string, timeLabel: string, concreteEvent: string },
};

class EventRow extends React.Component<PropsType> {
  interval: ?number;

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 5000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  renderConcreteEvent = event => {
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

export default createFragmentContainer(withStyles(styles)(EventRow), {
  event: graphql`
    fragment EventRow_event on Event {
      typename: __typename
      id
      at {
        iso8601
      }
      ...EventCaughtRow_event
      ...EventReleasedRow_event
    }
  `,
});
