/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type PokemonRow_pokemon$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type PokemonsList_pokemons$ref: FragmentReference;
export type PokemonsList_pokemons = $ReadOnlyArray<{|
  +id: string,
  +$fragmentRefs: PokemonRow_pokemon$ref,
  +$refType: PokemonsList_pokemons$ref,
|}>;
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "PokemonsList_pokemons",
  "type": "Pokemon",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PokemonRow_pokemon",
      "args": null
    }
  ]
};
(node/*: any*/).hash = 'c9a1989767fb6f9171406a7770c270a6';
module.exports = node;
