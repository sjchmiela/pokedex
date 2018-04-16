/**
 * @flow
 * @relayHash 2d8e1dbe3441aa2551efa0886862e76e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ConnectionSpeciesList_query$ref = any;
export type ConnectionSpeciesListPaginationQueryVariables = {|
  count: number,
  cursor?: ?string,
  searchTerm?: ?string,
|};
export type ConnectionSpeciesListPaginationQueryResponse = {|
  +$fragmentRefs: ConnectionSpeciesList_query$ref,
|};
*/


/*
query ConnectionSpeciesListPaginationQuery(
  $count: Int!
  $cursor: String
  $searchTerm: String
) {
  ...ConnectionSpeciesList_query_1YZSDV
}

fragment ConnectionSpeciesList_query_1YZSDV on RootQueryType {
  species(first: $count, after: $cursor, searchTerm: $searchTerm) {
    edges {
      node {
        id
        ...SpeciesList_species
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

fragment SpeciesList_species on Species {
  id
  name
  imageUrl
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
    "name": "searchTerm",
    "type": "String",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ConnectionSpeciesListPaginationQuery",
  "id": null,
  "text": "query ConnectionSpeciesListPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $searchTerm: String\n) {\n  ...ConnectionSpeciesList_query_1YZSDV\n}\n\nfragment ConnectionSpeciesList_query_1YZSDV on RootQueryType {\n  species(first: $count, after: $cursor, searchTerm: $searchTerm) {\n    edges {\n      node {\n        id\n        ...SpeciesList_species\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SpeciesList_species on Species {\n  id\n  name\n  imageUrl\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ConnectionSpeciesListPaginationQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "ConnectionSpeciesList_query",
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
          },
          {
            "kind": "Variable",
            "name": "searchTerm",
            "variableName": "searchTerm",
            "type": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ConnectionSpeciesListPaginationQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "species",
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
          },
          {
            "kind": "Variable",
            "name": "searchTerm",
            "variableName": "searchTerm",
            "type": "String"
          }
        ],
        "concreteType": "SpeciesConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "SpeciesEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Species",
                "plural": false,
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
        "name": "species",
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
          },
          {
            "kind": "Variable",
            "name": "searchTerm",
            "variableName": "searchTerm",
            "type": "String"
          }
        ],
        "handle": "connection",
        "key": "ConnectionSpeciesList_species",
        "filters": [
          "searchTerm"
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '3cc3d74c19a639f7c2529a9be05e28d4';
module.exports = node;
