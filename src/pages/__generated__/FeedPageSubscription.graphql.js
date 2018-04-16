/**
 * @flow
 * @relayHash 252d63ceeb62c028e0f91dbd10d9531e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type EventRow_event$ref = any;
export type FeedPageSubscriptionVariables = {| |};
export type FeedPageSubscriptionResponse = {|
  +eventsFeed: ?{|
    +id: string,
    +$fragmentRefs: EventRow_event$ref,
  |},
|};
*/


/*
subscription FeedPageSubscription {
  eventsFeed {
    __typename
    id
    ...EventRow_event
  }
}

fragment EventRow_event on Event {
  typename: __typename
  id
  at {
    iso8601
  }
  ...EventCaughtRow_event
  ...EventReleasedRow_event
}

fragment EventCaughtRow_event on EventCaught {
  pokemon {
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
    trainer {
      displayName
      id
    }
    id
  }
}

fragment EventReleasedRow_event on EventReleased {
  comment
  at {
    iso8601
  }
  pokemon {
    caughtAt {
      iso8601
    }
    weight
    height
    species {
      name
      imageUrl
      id
    }
    trainer {
      displayName
      id
    }
    id
  }
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
],
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "caughtAt",
  "storageKey": null,
  "args": null,
  "concreteType": "Datetime",
  "plural": false,
  "selections": v1
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "weight",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "height",
  "args": null,
  "storageKey": null
},
v5 = {
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
v6 = {
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
    },
    v0
  ]
};
return {
  "kind": "Request",
  "operationKind": "subscription",
  "name": "FeedPageSubscription",
  "id": null,
  "text": "subscription FeedPageSubscription {\n  eventsFeed {\n    __typename\n    id\n    ...EventRow_event\n  }\n}\n\nfragment EventRow_event on Event {\n  typename: __typename\n  id\n  at {\n    iso8601\n  }\n  ...EventCaughtRow_event\n  ...EventReleasedRow_event\n}\n\nfragment EventCaughtRow_event on EventCaught {\n  pokemon {\n    weight\n    height\n    caughtAt {\n      iso8601\n    }\n    species {\n      name\n      imageUrl\n      id\n    }\n    trainer {\n      displayName\n      id\n    }\n    id\n  }\n}\n\nfragment EventReleasedRow_event on EventReleased {\n  comment\n  at {\n    iso8601\n  }\n  pokemon {\n    caughtAt {\n      iso8601\n    }\n    weight\n    height\n    species {\n      name\n      imageUrl\n      id\n    }\n    trainer {\n      displayName\n      id\n    }\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "FeedPageSubscription",
    "type": "RootSubscriptionType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "eventsFeed",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          v0,
          {
            "kind": "FragmentSpread",
            "name": "EventRow_event",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedPageSubscription",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "eventsFeed",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          v0,
          {
            "kind": "ScalarField",
            "alias": "typename",
            "name": "__typename",
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
            "selections": v1
          },
          {
            "kind": "InlineFragment",
            "type": "EventReleased",
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
                "name": "pokemon",
                "storageKey": null,
                "args": null,
                "concreteType": "Pokemon",
                "plural": false,
                "selections": [
                  v2,
                  v3,
                  v4,
                  v5,
                  v6,
                  v0
                ]
              }
            ]
          },
          {
            "kind": "InlineFragment",
            "type": "EventCaught",
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
                  v3,
                  v4,
                  v2,
                  v5,
                  v6,
                  v0
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '5afceff8299165ef714351c1dc8542cd';
module.exports = node;
