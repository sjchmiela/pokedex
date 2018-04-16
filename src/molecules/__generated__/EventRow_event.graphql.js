/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type EventCaughtRow_event$ref = any;
type EventReleasedRow_event$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type EventRow_event$ref: FragmentReference;
export type EventRow_event = {|
  +typename: string,
  +id: string,
  +at: ?{|
    +iso8601: ?string,
  |},
  +$fragmentRefs: (EventCaughtRow_event$ref & EventReleasedRow_event$ref),
  +$refType: EventRow_event$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "EventRow_event",
  "type": "Event",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "typename",
      "name": "__typename",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "at",
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
      "kind": "FragmentSpread",
      "name": "EventCaughtRow_event",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "EventReleasedRow_event",
      "args": null
    }
  ]
};
(node/*: any*/).hash = '6c20914e6a3ddcf6b0257edd3b7ea52f';
module.exports = node;
