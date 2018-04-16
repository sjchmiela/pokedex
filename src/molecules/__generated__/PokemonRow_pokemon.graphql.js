/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type PokemonRow_pokemon$ref: FragmentReference;
export type PokemonRow_pokemon = {|
  +id: string,
  +weight: ?number,
  +height: ?number,
  +caughtAt: ?{|
    +iso8601: ?string,
  |},
  +species: ?{|
    +name: ?string,
    +imageUrl: ?string,
  |},
  +releasedAt: ?{|
    +iso8601: ?string,
  |},
  +releaseComment: ?string,
  +$refType: PokemonRow_pokemon$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "iso8601",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "PokemonRow_pokemon",
  "type": "Pokemon",
  "metadata": null,
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
      "kind": "ScalarField",
      "alias": null,
      "name": "weight",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "height",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "caughtAt",
      "storageKey": null,
      "args": null,
      "concreteType": "Datetime",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "species",
      "storageKey": null,
      "args": null,
      "concreteType": "Species",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "imageUrl",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "releasedAt",
      "storageKey": null,
      "args": null,
      "concreteType": "Datetime",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "releaseComment",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node/*: any*/).hash = 'd2d2e51912b69a400133b563348f31df';
module.exports = node;
