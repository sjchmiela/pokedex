// @flow
import * as React from "react";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import { createFragmentContainer, graphql } from "react-relay";
import PokemonImage from "../atoms/PokemonImage";

import EventReleasedRow_event from "./__generated__/EventReleasedRow_event";

type PropsType = {
  event: EventReleasedRow_event,
};

type SpeciesType = {
  id: string,
  name: string,
  imageUrl: ?string,
};

class EventReleasedRow extends React.Component<PropsType> {
  getSecondaryText = () =>
    this.props.event.comment
      ? `Comment: ${this.props.event.comment}`
      : "No comment provided";
  renderAvatar = (species: SpeciesType): ?React.Node =>
    species.imageUrl ? (
      <PokemonImage alt={species.name} src={species.imageUrl} />
    ) : null;

  render() {
    const { event: { pokemon: { trainer }, pokemon } } = this.props;
    return (
      // $FlowFixMe <3
      <React.Fragment>
        {this.renderAvatar(pokemon.species)}
        <ListItemText
          primary={`${pokemon.species.name} released by ${trainer.displayName}`}
          secondary={this.getSecondaryText()}
        />
      </React.Fragment>
    );
  }
}

export default createFragmentContainer(EventReleasedRow, {
  event: graphql`
    fragment EventReleasedRow_event on EventReleased {
      comment
      at {
        iso8601
      }
      pokemon {
        caughtAt {
          iso8601
        }
        weight
        height
        species {
          name
          imageUrl
        }
        trainer {
          displayName
        }
      }
    }
  `,
});
