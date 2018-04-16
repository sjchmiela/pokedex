/**
 * @flow
 * @relayHash b6a99e40d3108f9a38b7bb8f25d8a3c3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type enforceUnauthenticatedQueryVariables = {| |};
export type enforceUnauthenticatedQueryResponse = {|
  +me: ?{|
    +id: string,
  |},
|};
*/


/*
query enforceUnauthenticatedQuery {
  me {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "enforceUnauthenticatedQuery",
  "id": null,
  "text": "query enforceUnauthenticatedQuery {\n  me {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "enforceUnauthenticatedQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "enforceUnauthenticatedQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node/*: any*/).hash = '852e5a721166168688f0d32350741c55';
module.exports = node;
