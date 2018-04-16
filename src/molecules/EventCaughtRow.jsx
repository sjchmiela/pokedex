// @flow
import * as React from "react";
import ListItemText from "material-ui/List/ListItemText";
import { createFragmentContainer, graphql } from "react-relay";
import PokemonImage from "../atoms/PokemonImage";

import EventCaughtRow_event from "./__generated__/EventCaughtRow_event";

type PropsType = {
  event: EventCaughtRow_event,
};

type SpeciesType = {
  id: string,
  name: string,
  imageUrl: ?string,
};

class EventCaughtRow extends React.Component<PropsType> {
  renderAvatar = (species: SpeciesType): ?React.Node =>
    species.imageUrl ? (
      <PokemonImage alt={species.name} src={species.imageUrl} />
    ) : null;

  render() {
    const { event: { pokemon: { trainer }, pokemon } } = this.props;
    return (
      // $FlowFixMe: #react #fragment
      <React.Fragment>
        {this.renderAvatar(pokemon.species)}
        <ListItemText
          primary={`${pokemon.species.name} caught by ${trainer.displayName}`}
          secondary={`${pokemon.weight} kg, ${pokemon.height} cm, ${new Date(
            pokemon.caughtAt.iso8601,
          ).toLocaleString()}`}
        />
      </React.Fragment>
    );
  }
}

export default createFragmentContainer(EventCaughtRow, {
  event: graphql`
    fragment EventCaughtRow_event on EventCaught {
      pokemon {
        weight
        height
        caughtAt {
          iso8601
        }
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
