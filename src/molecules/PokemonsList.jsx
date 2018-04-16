// @flow

import * as React from "react";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import { createFragmentContainer, graphql } from "react-relay";

import PokemonImage from "../atoms/PokemonImage";

import PokemonRow from "../molecules/PokemonRow";

import PokemonsList_pokemons from "./__generated__/PokemonsList_pokemons";

type PropsType = {
  pokemons: PokemonsList_pokemons,
  stringFilter?: ?string,
};

type SpeciesType = {
  id: string,
  name: string,
  imageUrl: ?string,
};

type PokemonType = {
  id: string,
  weight: number,
  height: number,
  species: SpeciesType,
  caughtAt: { iso8601: string },
};

class PokemonsList extends React.Component<PropsType> {
  renderPokemons = (pokemons: Array<PokemonType>): Array<React.Element<*>> =>
    pokemons.map(pokemon => <PokemonRow key={pokemon.id} pokemon={pokemon} />);

  render() {
    return <List>{this.renderPokemons(this.props.pokemons)}</List>;
  }
}

export default createFragmentContainer(PokemonsList, {
  pokemons: graphql`
    fragment PokemonsList_pokemons on Pokemon @relay(plural: true) {
      id
      ...PokemonRow_pokemon
    }
  `,
});
