// @flow

import * as React from "react";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
// STEP 12
// Now we're gonna prepare SpeciesList to request and digest data from Relay.
// Let's import from "react-relay":
// * { graphql } - to denote GraphQL queries
// * { createFragmentContainer } - to create a [Fragment Container](https://facebook.github.io/relay/docs/en/fragment-container.html)

// STEP 16
// Add `import SpeciesList_species from "./__generated__/SpeciesList_species"`
// and use the imported type as the type of `species` prop.

import PokemonImage from "../atoms/PokemonImage";

type PropsType = {
  species: Array<SpeciesType>,
  searchTerm?: ?string,
};

type SpeciesType = {
  id: string,
  name: string,
  imageUrl: ?string,
};
// STEP 13
// Remove `export default` as we will export component created by `createFragmentContainer` [HOC](https://reactjs.org/docs/higher-order-components.html)
export default class SpeciesList extends React.Component<PropsType> {
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

// STEP 14
// Try to write a query in GraphiQL that uses `fragment <name> on Species` (http://graphql.org/learn/queries/#fragments).
// Use GraphiQL for autocomplete. Don't worry about GraphiQL's
// "fragment is not used" complains.
// Generate `schema.json` that is used by (Relay Compiler)[https://facebook.github.io/relay/docs/en/graphql-in-relay.html#relay-compiler]
// to staticly check and compile queries from JavaScript code. You can do this by executing `mix graphql.schema`.

// STEP 15
// Create a fragment container using `createFragmentContainer`. The query should consist of a fragment named
// `WrappedComponentName_item` with `@relay(plural: true)` annotation that indicates its use on plural field (array).
// In result the first line of the query should look like this: `fragment SpeciesList_species on Species @relay(plural: true) {`
// Please include the attributes listed in `type SpeciesType` and export the created fragment container by default:
// `export default createFragmentContainer(...`
