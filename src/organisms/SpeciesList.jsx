// @flow

import * as React from "react";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import { graphql, createFragmentContainer } from "react-relay";

import SpeciesList_species from "./__generated__/SpeciesList_species";

import PokemonImage from "../atoms/PokemonImage";

type PropsType = {
  species: SpeciesList_species,
  searchTerm?: ?string,
};

type SpeciesType = {
  id: string,
  name: string,
  imageUrl: ?string,
};

class SpeciesList extends React.Component<PropsType> {
  getSpecies = (): Array<SpeciesType> => {
    const allSpecies = this.props.species;

    if (this.props.searchTerm) {
      const searchTerm: string = this.props.searchTerm.toLowerCase();

      return allSpecies.filter((species: SpeciesType): boolean =>
        species.name.toLowerCase().includes(searchTerm),
      );
    }

    return allSpecies;
  };

  renderAvatar = (species: SpeciesType): ?React.Node =>
    species.imageUrl ? (
      <PokemonImage alt={species.name} src={species.imageUrl} />
    ) : null;

  renderSpecies = (species: SpeciesType): React.Element<*> => (
    <ListItem key={species.id}>
      {this.renderAvatar(species)}
      <ListItemText primary={species.name} />
    </ListItem>
  );

  renderAllSpecies = (species: Array<SpeciesType>): Array<React.Element<*>> =>
    species.map(this.renderSpecies);

  render() {
    const species = this.getSpecies();

    return <List>{this.renderAllSpecies(species)}</List>;
  }
}

export default createFragmentContainer(SpeciesList, {
  species: graphql`
    fragment SpeciesList_species on Species @relay(plural: true) {
      id
      name
      imageUrl
    }
  `,
});
