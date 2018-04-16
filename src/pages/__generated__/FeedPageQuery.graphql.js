/**
 * @flow
 * @relayHash 039a69183b93bfd6d726fcdab973ecec
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type EventRow_event$ref = any;
export type FeedPageQueryVariables = {| |};
export type FeedPageQueryResponse = {|
  +viewer: ?{|
    +id: ?string,
    +events: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +$fragmentRefs: EventRow_event$ref,
        |},
      |}>,
    |},
  |},
|};
*/


/*
query FeedPageQuery {
  viewer {
    id
    events(first: 5) {
      edges {
        node {
          id
          ...EventRow_event
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v3 = {
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
},
v4 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "iso8601",
    "args": null,
    "storageKey": null
  }
],
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "caughtAt",
  "storageKey": null,
  "args": null,
  "concreteType": "Datetime",
  "plural": false,
  "selections": v4
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "weight",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "height",
  "args": null,
  "storageKey": null
},
v8 = {
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
v9 = {
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
  "operationKind": "query",
  "name": "FeedPageQuery",
  "id": null,
  "text": "query FeedPageQuery {\n  viewer {\n    id\n    events(first: 5) {\n      edges {\n        node {\n          id\n          ...EventRow_event\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment EventRow_event on Event {\n  typename: __typename\n  id\n  at {\n    iso8601\n  }\n  ...EventCaughtRow_event\n  ...EventReleasedRow_event\n}\n\nfragment EventCaughtRow_event on EventCaught {\n  pokemon {\n    weight\n    height\n    caughtAt {\n      iso8601\n    }\n    species {\n      name\n      imageUrl\n      id\n    }\n    trainer {\n      displayName\n      id\n    }\n    id\n  }\n}\n\nfragment EventReleasedRow_event on EventReleased {\n  comment\n  at {\n    iso8601\n  }\n  pokemon {\n    caughtAt {\n      iso8601\n    }\n    weight\n    height\n    species {\n      name\n      imageUrl\n      id\n    }\n    trainer {\n      displayName\n      id\n    }\n    id\n  }\n}\n",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "viewer",
          "events"
        ]
      }
    ]
  },
  "fragment": {
    "kind": "Fragment",
    "name": "FeedPageQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          v0,
          {
            "kind": "LinkedField",
            "alias": "events",
            "name": "__feed_events_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "EventConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "EventEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
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
                      },
                      v1
                    ]
                  },
                  v2
                ]
              },
              v3
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedPageQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          v0,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "events",
            "storageKey": "events(first:5)",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5,
                "type": "Int"
              }
            ],
            "concreteType": "EventConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "EventEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
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
                        "selections": v4
                      },
                      v1,
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
                              v5,
                              v6,
                              v7,
                              v8,
                              v9,
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
                              v6,
                              v7,
                              v5,
                              v8,
                              v9,
                              v0
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  v2
                ]
              },
              v3
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "events",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5,
                "type": "Int"
              }
            ],
            "handle": "connection",
            "key": "feed_events",
            "filters": null
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '60052c3b4aa83d24d91f24c3f16fc8a4';
module.exports = node;
