/**
 * @flow
 * @relayHash 03be0149c25e3bb57a27c18aa436d28b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ConnectionSpeciesList_query$ref = any;
export type ApplicationDrawerQueryVariables = {|
  searchTerm?: ?string,
|};
export type ApplicationDrawerQueryResponse = {|
  +$fragmentRefs: ConnectionSpeciesList_query$ref,
|};
*/


/*
query ApplicationDrawerQuery(
  $searchTerm: String
) {
  ...ConnectionSpeciesList_query_1CW4ID
}

fragment ConnectionSpeciesList_query_1CW4ID on RootQueryType {
  species(first: 20, searchTerm: $searchTerm) {
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
    "name": "searchTerm",
    "type": "String",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ApplicationDrawerQuery",
  "id": null,
  "text": "query ApplicationDrawerQuery(\n  $searchTerm: String\n) {\n  ...ConnectionSpeciesList_query_1CW4ID\n}\n\nfragment ConnectionSpeciesList_query_1CW4ID on RootQueryType {\n  species(first: 20, searchTerm: $searchTerm) {\n    edges {\n      node {\n        id\n        ...SpeciesList_species\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SpeciesList_species on Species {\n  id\n  name\n  imageUrl\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ApplicationDrawerQuery",
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
    "name": "ApplicationDrawerQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "species",
        "storageKey": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 20,
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
            "kind": "Literal",
            "name": "first",
            "value": 20,
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
(node/*: any*/).hash = 'fd5b7c8a95b90534229d649337acfcf5';
module.exports = node;
