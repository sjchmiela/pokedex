/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type SpeciesList_species$ref: FragmentReference;
export type SpeciesList_species = $ReadOnlyArray<{|
  +id: string,
  +name: ?string,
  +imageUrl: ?string,
  +$refType: SpeciesList_species$ref,
|}>;
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "SpeciesList_species",
  "type": "Species",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
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
};
(node/*: any*/).hash = 'bed6472227861913627c03a22048eaa7';
module.exports = node;
