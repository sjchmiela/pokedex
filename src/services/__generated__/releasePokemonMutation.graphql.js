/**
 * @flow
 * @relayHash e6002e582f4e892c0bfba659c8d94746
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type releasePokemonMutationVariables = {|
  input: {
    comment: string,
    pokemonId: string,
  },
|};
export type releasePokemonMutationResponse = {|
  +releasePokemon: ?{|
    +event: ?{|
      +id: string,
      +pokemon: ?{|
        +releasedAt: ?{|
          +iso8601: ?string,
        |},
        +releaseComment: ?string,
      |},
    |},
  |},
|};
*/


/*
mutation releasePokemonMutation(
  $input: ReleasePokemonInput!
) {
  releasePokemon(input: $input) {
    event {
      id
      pokemon {
        releasedAt {
          iso8601
        }
        releaseComment
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ReleasePokemonInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "ReleasePokemonInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "releasedAt",
  "storageKey": null,
  "args": null,
  "concreteType": "Datetime",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "iso8601",
      "args": null,
      "storageKey": null
    }
  ]
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "releaseComment",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "releasePokemonMutation",
  "id": null,
  "text": "mutation releasePokemonMutation(\n  $input: ReleasePokemonInput!\n) {\n  releasePokemon(input: $input) {\n    event {\n      id\n      pokemon {\n        releasedAt {\n          iso8601\n        }\n        releaseComment\n        id\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "releasePokemonMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "releasePokemon",
        "storageKey": null,
        "args": v1,
        "concreteType": "ReleasePokemonPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "event",
            "storageKey": null,
            "args": null,
            "concreteType": "EventReleased",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pokemon",
                "storageKey": null,
                "args": null,
                "concreteType": "Pokemon",
                "plural": false,
                "selections": [
                  v3,
                  v4
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
    "name": "releasePokemonMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "releasePokemon",
        "storageKey": null,
        "args": v1,
        "concreteType": "ReleasePokemonPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "event",
            "storageKey": null,
            "args": null,
            "concreteType": "EventReleased",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pokemon",
                "storageKey": null,
                "args": null,
                "concreteType": "Pokemon",
                "plural": false,
                "selections": [
                  v3,
                  v4,
                  v2
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'f79c3a80b2696a1a529b4311ba662ce3';
module.exports = node;
