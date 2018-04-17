/**
 * @flow
 * @relayHash 117fc762be4c87a5595f322221a748bd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type EventCaughtRow_event$ref = any;
type EventReleasedRow_event$ref = any;
export type FeedPageQueryVariables = {| |};
export type FeedPageQueryResponse = {|
  +viewer: ?{|
    +id: ?string,
    +releaseEvents: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +at: ?{|
            +iso8601: ?string,
          |},
          +typename: string,
          +$fragmentRefs: EventReleasedRow_event$ref,
        |},
      |}>,
    |},
    +caughtEvents: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +at: ?{|
            +iso8601: ?string,
          |},
          +typename: string,
          +$fragmentRefs: EventCaughtRow_event$ref,
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
    releaseEvents(first: 5) {
      edges {
        node {
          id
          at {
            iso8601
          }
          typename: __typename
          ...EventReleasedRow_event
        }
      }
    }
    caughtEvents(first: 5) {
      edges {
        node {
          id
          at {
            iso8601
          }
          typename: __typename
          ...EventCaughtRow_event
        }
      }
    }
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
    "kind": "Literal",
    "name": "first",
    "value": 5,
    "type": "Int"
  }
],
v2 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "iso8601",
    "args": null,
    "storageKey": null
  }
],
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "at",
  "storageKey": null,
  "args": null,
  "concreteType": "Datetime",
  "plural": false,
  "selections": v2
},
v4 = {
  "kind": "ScalarField",
  "alias": "typename",
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "caughtAt",
  "storageKey": null,
  "args": null,
  "concreteType": "Datetime",
  "plural": false,
  "selections": v2
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
  "text": "query FeedPageQuery {\n  viewer {\n    id\n    releaseEvents(first: 5) {\n      edges {\n        node {\n          id\n          at {\n            iso8601\n          }\n          typename: __typename\n          ...EventReleasedRow_event\n        }\n      }\n    }\n    caughtEvents(first: 5) {\n      edges {\n        node {\n          id\n          at {\n            iso8601\n          }\n          typename: __typename\n          ...EventCaughtRow_event\n        }\n      }\n    }\n  }\n}\n\nfragment EventReleasedRow_event on EventReleased {\n  comment\n  at {\n    iso8601\n  }\n  pokemon {\n    caughtAt {\n      iso8601\n    }\n    weight\n    height\n    species {\n      name\n      imageUrl\n      id\n    }\n    trainer {\n      displayName\n      id\n    }\n    id\n  }\n}\n\nfragment EventCaughtRow_event on EventCaught {\n  pokemon {\n    weight\n    height\n    caughtAt {\n      iso8601\n    }\n    species {\n      name\n      imageUrl\n      id\n    }\n    trainer {\n      displayName\n      id\n    }\n    id\n  }\n}\n",
  "metadata": {},
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
            "alias": null,
            "name": "releaseEvents",
            "storageKey": "releaseEvents(first:5)",
            "args": v1,
            "concreteType": "EventReleasedConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "EventReleasedEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "EventReleased",
                    "plural": false,
                    "selections": [
                      v0,
                      v3,
                      v4,
                      {
                        "kind": "FragmentSpread",
                        "name": "EventReleasedRow_event",
                        "args": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "caughtEvents",
            "storageKey": "caughtEvents(first:5)",
            "args": v1,
            "concreteType": "EventCaughtConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "EventCaughtEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "EventCaught",
                    "plural": false,
                    "selections": [
                      v0,
                      v3,
                      v4,
                      {
                        "kind": "FragmentSpread",
                        "name": "EventCaughtRow_event",
                        "args": null
                      }
                    ]
                  }
                ]
              }
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
            "name": "releaseEvents",
            "storageKey": "releaseEvents(first:5)",
            "args": v1,
            "concreteType": "EventReleasedConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "EventReleasedEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "EventReleased",
                    "plural": false,
                    "selections": [
                      v0,
                      v3,
                      v4,
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
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "caughtEvents",
            "storageKey": "caughtEvents(first:5)",
            "args": v1,
            "concreteType": "EventCaughtConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "EventCaughtEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "EventCaught",
                    "plural": false,
                    "selections": [
                      v0,
                      v3,
                      v4,
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
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'b620704a2c565bf8311bb0806adbb84f';
module.exports = node;
