/**
 * @flow
 * @relayHash f9dab649cdc29ed773ec04dbbe99f9b7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type enforceAuthenticatedQueryVariables = {| |};
export type enforceAuthenticatedQueryResponse = {|
  +me: ?{|
    +id: string,
  |},
|};
*/


/*
query enforceAuthenticatedQuery {
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
  "name": "enforceAuthenticatedQuery",
  "id": null,
  "text": "query enforceAuthenticatedQuery {\n  me {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "enforceAuthenticatedQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "enforceAuthenticatedQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node/*: any*/).hash = 'f9e7084af432f4f5a6c3456cc2dd3968';
module.exports = node;
