/**
 * @flow
 * @relayHash 5d3239fb2101d456dc3b91aac1cfe1c7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RecentlyCaughtPokemonsList_trainer$ref = any;
export type HomePageQueryVariables = {| |};
export type HomePageQueryResponse = {|
  +me: ?{|
    +trainer: ?{|
      +id: string,
      +$fragmentRefs: RecentlyCaughtPokemonsList_trainer$ref,
    |},
  |},
|};
*/


/*
query HomePageQuery {
  me {
    trainer {
      id
      ...RecentlyCaughtPokemonsList_trainer
    }
    id
  }
}

fragment RecentlyCaughtPokemonsList_trainer on Trainer {
  id
  pokemons(first: 5) {
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
  releasedAt {
    iso8601
  }
  releaseComment
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "iso8601",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "HomePageQuery",
  "id": null,
  "text": "query HomePageQuery {\n  me {\n    trainer {\n      id\n      ...RecentlyCaughtPokemonsList_trainer\n    }\n    id\n  }\n}\n\nfragment RecentlyCaughtPokemonsList_trainer on Trainer {\n  id\n  pokemons(first: 5) {\n    edges {\n      node {\n        id\n        ...PokemonsList_pokemons\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment PokemonsList_pokemons on Pokemon {\n  id\n  ...PokemonRow_pokemon\n}\n\nfragment PokemonRow_pokemon on Pokemon {\n  id\n  weight\n  height\n  caughtAt {\n    iso8601\n  }\n  species {\n    name\n    imageUrl\n    id\n  }\n  releasedAt {\n    iso8601\n  }\n  releaseComment\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "HomePageQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "trainer",
            "storageKey": null,
            "args": null,
            "concreteType": "Trainer",
            "plural": false,
            "selections": [
              v0,
              {
                "kind": "FragmentSpread",
                "name": "RecentlyCaughtPokemonsList_trainer",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "HomePageQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "trainer",
            "storageKey": null,
            "args": null,
            "concreteType": "Trainer",
            "plural": false,
            "selections": [
              v0,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pokemons",
                "storageKey": "pokemons(first:5)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 5,
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
                          v0,
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
                            "selections": v1
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
                              v0
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
                            "selections": v1
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "releaseComment",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "__typename",
                            "args": null,
                            "storageKey": null
                          }
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
                    "kind": "Literal",
                    "name": "first",
                    "value": 5,
                    "type": "Int"
                  }
                ],
                "handle": "connection",
                "key": "RecentlyCaughtPokemonsList_pokemons",
                "filters": null
              }
            ]
          },
          v0
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'bbcd229913a7c94cf6b0793c660a6cfc';
module.exports = node;
