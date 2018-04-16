// @flow

import * as React from "react";
import Waypoint from "react-waypoint";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import { createFragmentContainer, graphql } from "react-relay";

import PokemonImage from "../atoms/PokemonImage";

import SpeciesList_species from "./__generated__/SpeciesList_species";

type PropsType = {
  species: SpeciesList_species,
  onLoadMore?: () => void,
  searchTerm?: ?string,
};

type SpeciesType = {
  id: string,
  name: string,
  imageUrl: ?string,
};

class SpeciesList extends React.Component<PropsType> {
  maybeRenderWaypoint = (): ?React.Node =>
    this.props.onLoadMore ? <Waypoint onEnter={this.props.onLoadMore} /> : null;

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

  renderAllSpecies = (species: Array<SpeciesType>): React.Element<*> => (
    // $FlowFixMeOrYourself
    <React.Fragment>
      {species.slice(0, 3 * species.length / 4).map(this.renderSpecies)}
      {this.maybeRenderWaypoint()}
      {species.slice(3 * species.length / 4).map(this.renderSpecies)}
    </React.Fragment>
  );

  render() {
    return <List>{this.renderAllSpecies(this.props.species)}</List>;
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
