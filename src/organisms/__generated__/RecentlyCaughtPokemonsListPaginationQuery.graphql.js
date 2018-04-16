/**
 * @flow
 * @relayHash a917eac252f74ce8e7314323acd6be3d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RecentlyCaughtPokemonsList_trainer$ref = any;
export type RecentlyCaughtPokemonsListPaginationQueryVariables = {|
  count: number,
  cursor?: ?string,
  trainerID: string,
|};
export type RecentlyCaughtPokemonsListPaginationQueryResponse = {|
  +trainer: ?{|
    +$fragmentRefs: RecentlyCaughtPokemonsList_trainer$ref,
  |},
|};
*/


/*
query RecentlyCaughtPokemonsListPaginationQuery(
  $count: Int!
  $cursor: String
  $trainerID: ID!
) {
  trainer: node(id: $trainerID) {
    __typename
    ...RecentlyCaughtPokemonsList_trainer_1G22uz
    id
  }
}

fragment RecentlyCaughtPokemonsList_trainer_1G22uz on Trainer {
  id
  pokemons(first: $count, after: $cursor) {
    edges {
      node {
        id
        ...PokemonsList_pokemons
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment PokemonsList_pokemons on Pokemon {
  id
  ...PokemonRow_pokemon
}

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
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "trainerID",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "trainerID",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
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
  "operationKind": "query",
  "name": "RecentlyCaughtPokemonsListPaginationQuery",
  "id": null,
  "text": "query RecentlyCaughtPokemonsListPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $trainerID: ID!\n) {\n  trainer: node(id: $trainerID) {\n    __typename\n    ...RecentlyCaughtPokemonsList_trainer_1G22uz\n    id\n  }\n}\n\nfragment RecentlyCaughtPokemonsList_trainer_1G22uz on Trainer {\n  id\n  pokemons(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...PokemonsList_pokemons\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment PokemonsList_pokemons on Pokemon {\n  id\n  ...PokemonRow_pokemon\n}\n\nfragment PokemonRow_pokemon on Pokemon {\n  id\n  weight\n  height\n  caughtAt {\n    iso8601\n  }\n  species {\n    name\n    imageUrl\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RecentlyCaughtPokemonsListPaginationQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "trainer",
        "name": "node",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "RecentlyCaughtPokemonsList_trainer",
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor",
                "type": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RecentlyCaughtPokemonsListPaginationQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "trainer",
        "name": "node",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          v2,
          v3,
          {
            "kind": "InlineFragment",
            "type": "Trainer",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pokemons",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "after",
                    "variableName": "cursor",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "count",
                    "type": "Int"
                  }
                ],
                "concreteType": "PokemonConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PokemonEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Pokemon",
                        "plural": false,
                        "selections": [
                          v3,
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
                              },
                              v3
                            ]
                          },
                          v2
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "pageInfo",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "pokemons",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "after",
                    "variableName": "cursor",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "count",
                    "type": "Int"
                  }
                ],
                "handle": "connection",
                "key": "RecentlyCaughtPokemonsList_pokemons",
                "filters": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '64c6b606475b2909cc4b59d403fe7a0d';
module.exports = node;
