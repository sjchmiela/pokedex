/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type EventReleasedRow_event$ref: FragmentReference;
export type EventReleasedRow_event = {|
  +comment: ?string,
  +at: ?{|
    +iso8601: ?string,
  |},
  +pokemon: ?{|
    +caughtAt: ?{|
      +iso8601: ?string,
    |},
    +weight: ?number,
    +height: ?number,
    +species: ?{|
      +name: ?string,
      +imageUrl: ?string,
    |},
    +trainer: ?{|
      +displayName: ?string,
    |},
  |},
  +$refType: EventReleasedRow_event$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "iso8601",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "EventReleasedRow_event",
  "type": "EventReleased",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "comment",
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
      "selections": v0
    },
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
          "kind": "LinkedField",
          "alias": null,
          "name": "caughtAt",
          "storageKey": null,
          "args": null,
          "concreteType": "Datetime",
          "plural": false,
          "selections": v0
        },
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
})();
(node/*: any*/).hash = 'c644dcd0c548275c19d54dae9fb49180';
module.exports = node;
