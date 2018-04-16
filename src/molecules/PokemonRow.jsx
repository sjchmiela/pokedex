// @flow

import * as React from "react";
import { withStyles } from "material-ui/styles";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";

import { createFragmentContainer, graphql } from "react-relay";
import type { ContextType } from "../services/withRelayEnvironmentContext";
import withRelayEnvironmentContext from "../services/withRelayEnvironmentContext";
import ErrorMessage from "../atoms/ErrorMessage";
import PokemonImage from "../atoms/PokemonImage";

import PokemonRow_pokemon from "./__generated__/PokemonRow_pokemon";

type PropsType = ContextType & {
  pokemon: PokemonRow_pokemon,
};

type SpeciesType = {
  id: string,
  name: string,
  imageUrl: ?string,
};

const styles = () => ({
  released: {
    opacity: 0.5,
  },
});

class PokemonRow extends React.Component<PropsType> {
  renderAvatar = (species: SpeciesType): ?React.Node =>
    species.imageUrl ? (
      <PokemonImage alt={species.name} src={species.imageUrl} />
    ) : null;

  render() {
    const { pokemon } = this.props;

    const caughtAtText = new Date(pokemon.caughtAt.iso8601).toLocaleString();

    let secondaryText = `${pokemon.weight} kg, ${
      pokemon.height
    } cm, caught ${caughtAtText}`;

    return (
      // $FlowFixMe <3
      <React.Fragment>
        <ListItem disableGutters key={pokemon.id}>
          {this.renderAvatar(pokemon.species)}
          <ListItemText
            primary={pokemon.species.name}
            secondary={secondaryText}
          />
        </ListItem>
      </React.Fragment>
    );
  }
}

export default createFragmentContainer(
  withRelayEnvironmentContext(withStyles(styles)(PokemonRow)),
  {
    pokemon: graphql`
      fragment PokemonRow_pokemon on Pokemon {
        id
        weight
        height
        caughtAt {
          iso8601
        }
        species {
          name
          imageUrl
        }
      }
    `,
  },
);
