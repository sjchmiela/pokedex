/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type EventCaughtRow_event$ref: FragmentReference;
export type EventCaughtRow_event = {|
  +pokemon: ?{|
    +weight: ?number,
    +height: ?number,
    +caughtAt: ?{|
      +iso8601: ?string,
    |},
    +species: ?{|
      +name: ?string,
      +imageUrl: ?string,
    |},
    +trainer: ?{|
      +displayName: ?string,
    |},
  |},
  +$refType: EventCaughtRow_event$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "EventCaughtRow_event",
  "type": "EventCaught",
  "metadata": null,
  "argumentDefinitions": [],
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
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "trainer",
          "storageKey": null,
          "args": null,
          "concreteType": "Trainer",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "displayName",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node/*: any*/).hash = '023c65c135262d7af54b117dc9bf986a';
module.exports = node;
