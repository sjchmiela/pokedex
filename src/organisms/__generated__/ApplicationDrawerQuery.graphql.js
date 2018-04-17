/**
 * @flow
 * @relayHash 799a6ef2fd4441277533cb5e293275e4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type SpeciesList_species$ref = any;
export type ApplicationDrawerQueryVariables = {| |};
export type ApplicationDrawerQueryResponse = {|
  +speciesArray: ?$ReadOnlyArray<?{|
    +$fragmentRefs: SpeciesList_species$ref,
  |}>,
|};
*/


/*
query ApplicationDrawerQuery {
  speciesArray {
    ...SpeciesList_species
    id
  }
}

fragment SpeciesList_species on Species {
  id
  name
  imageUrl
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "operationKind": "query",
  "name": "ApplicationDrawerQuery",
  "id": null,
  "text": "query ApplicationDrawerQuery {\n  speciesArray {\n    ...SpeciesList_species\n    id\n  }\n}\n\nfragment SpeciesList_species on Species {\n  id\n  name\n  imageUrl\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ApplicationDrawerQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "speciesArray",
        "storageKey": null,
        "args": null,
        "concreteType": "Species",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SpeciesList_species",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ApplicationDrawerQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "speciesArray",
        "storageKey": null,
        "args": null,
        "concreteType": "Species",
        "plural": true,
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
          }
        ]
      }
    ]
  }
};
(node/*: any*/).hash = '8696fe713b57e91aba2810a83c48cb41';
module.exports = node;
