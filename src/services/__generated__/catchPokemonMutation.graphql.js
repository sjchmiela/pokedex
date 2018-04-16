/**
 * @flow
 * @relayHash 86614bdf37fda75261fbfa94a530de7d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type catchPokemonMutationVariables = {|
  input: {
    nestToken: string,
  },
|};
export type catchPokemonMutationResponse = {|
  +catchPokemon: ?{|
    +event: ?{|
      +pokemon: ?{|
        +species: ?{|
          +name: ?string,
        |},
      |},
    |},
  |},
|};
*/


/*
mutation catchPokemonMutation(
  $input: CatchPokemonInput!
) {
  catchPokemon(input: $input) {
    event {
      pokemon {
        species {
          name
          id
        }
        id
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CatchPokemonInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CatchPokemonInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "catchPokemonMutation",
  "id": null,
  "text": "mutation catchPokemonMutation(\n  $input: CatchPokemonInput!\n) {\n  catchPokemon(input: $input) {\n    event {\n      pokemon {\n        species {\n          name\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "catchPokemonMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "catchPokemon",
        "storageKey": null,
        "args": v1,
        "concreteType": "CatchPokemonPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "event",
            "storageKey": null,
            "args": null,
            "concreteType": "EventCaught",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pokemon",
                "storageKey": null,
                "args": null,
                "concreteType": "Pokemon",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "species",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Species",
                    "plural": false,
                    "selections": [
                      v2
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "catchPokemonMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "catchPokemon",
        "storageKey": null,
        "args": v1,
        "concreteType": "CatchPokemonPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "event",
            "storageKey": null,
            "args": null,
            "concreteType": "EventCaught",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pokemon",
                "storageKey": null,
                "args": null,
                "concreteType": "Pokemon",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "species",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Species",
                    "plural": false,
                    "selections": [
                      v2,
                      v3
                    ]
                  },
                  v3
                ]
              },
              v3
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '13db62795c0d4334a2bfd25a89462acd';
module.exports = node;
