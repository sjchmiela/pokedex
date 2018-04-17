# Subscriptions

## Motivation

Consider the following query:

```graphql
query {
  viewer {
    events(first: 10) {
      edges {
        node {
          ...
        }
      }
    }
  }
}
```

[Wouldn't it be nice](https://www.youtube.com/watch?v=lD4sxxoJGkA) if the client wouldn't have to refresh this whole query to know about new events? I wonder if there is a way for the server to push any updates to its clients, to its **subscribers**…

## Solution

A big round of applause for Subscriptions!

* Clients can be notified by the server of new updates, be it to a field's value (like current temperature in the room) or a whole new object (like a new message in a chat conversation).
* Subscriptions in Absinthe are easiest to implement in Phoenix channels.
* Clients update their source of data when an update comes in.
* We still have all the benefits of using GraphQL — clients can request the same subscription with different queries, requests are strongly typed.

## References

* https://hexdocs.pm/absinthe/subscriptions.html

## Spoilers

<details>
  <summary>Step 1</summary>

```elixir
supervisor(Absinthe.Subscription, [PokedexWeb.Endpoint])
```

</details>

<details>
  <summary>Step 2</summary>

```elixir
use Absinthe.Phoenix.Endpoint
```

</details>

<details>
  <summary>Step 3</summary>

```elixir
use Absinthe.Phoenix.Socket, schema: PokedexWeb.Schema
```

</details>

<details>
  <summary>Step 4</summary>

```elixir
subscription do
end
```

</details>

<details>
  <summary>Step 5</summary>

```elixir
object :trainership_subscriptions do
  field :events_feed, :event do
    config fn _, _ -> {:ok, topic: "events_feed"} end
  end
end
```

</details>

<details>
  <summary>Step 6</summary>

```elixir
subscription do
  import_fields(:trainership_subscriptions)
end
```

</details>

<details>
  <summary>Step 9</summary>

```elixir
object :trainership_subscriptions do
  field :events_feed, :event do
    config fn _, _ -> {:ok, topic: "events_feed"} end

    trigger :catch_pokemon, topic: fn _ -> "events_feed" end
    trigger :release_pokemon, topic: fn _ -> "events_feed" end
  end
end
```

</details>

<details>
  <summary>Step 10</summary>

```elixir
object :trainership_subscriptions do
  field :events_feed, :event do
    config fn _, _ -> {:ok, topic: "events_feed"} end

    trigger :catch_pokemon, topic: fn _ -> "events_feed" end
    trigger :release_pokemon, topic: fn _ -> "events_feed" end

    resolve fn %{event: event}, _, _ -> event end
  end
end
```

</details>

<details>
  <summary>Step 11</summary>

```sh
yarn add @absinthe/socket @absinthe/socket-relay phoenix
# or
npm install --save @absinthe/socket @absinthe/socket-relay phoenix
```

</details>

<details>
  <summary>Step 12</summary>

```js
import * as AbsintheSocket from "@absinthe/socket";
import { createSubscriber } from "@absinthe/socket-relay";
import { Socket as PhoenixSocket } from "phoenix";
```

</details>

<details>
  <summary>Step 13</summary>

```js
const absintheSocket = AbsintheSocket.create(new PhoenixSocket("/socket"));
```

</details>

<details>
  <summary>Step 14</summary>

```js
const network = Network.create(
  fetchQueryFactory(customHeaders),
  createSubscriber(absintheSocket),
);
```

</details>

<details>
  <summary>Step 15</summary>

```js
import { graphql, requestSubscription } from "react-relay";
```

</details>

<details>
  <summary>Step 16</summary>

```js
const subscription = graphql`
  subscription FeedPageSubscription {
    eventsFeed {
      ...EventRow_event
    }
  }
`;
```

</details>

<details>
  <summary>Step 17</summary>

```js
// Only for Flow users:
// import type { Disposable } from "react-relay";
//
// in the class:
// subscription: ?Disposable;
//
// endfor

componentDidMount() {
  this.subscription = this.createSubscription();
}

componentWillUnmount() {
  if (this.subscription) {
    this.subscription.dispose();
    this.subscription = null;
  }
}

createSubscription() {
  return requestSubscription(
    this.props.environment, {
      subscription,
      onNext: console.log,
    }
  );
}
```

</details>

<details>
  <summary>Step 18</summary>

```js
// $FlowFixMe
import { ConnectionHandler } from "relay-runtime";
```

</details>

<details>
  <summary>Step 19</summary>

```js
return requestSubscription(this.props.environment, {
  subscription,
  onNext: console.log,
  updater: store => {
    const rootField = store.getRootField("eventsFeed");
    const viewer = store.getRoot().getLinkedRecord("viewer");
    // $FlowFixMe: no ConnectionHandler in the stub
    const events = ConnectionHandler.getConnection(viewer, "feed_events");
    // $FlowFixMe: no ConnectionHandler in the stub
    const edge = ConnectionHandler.createEdge(
      store,
      events,
      rootField,
      "EventEdge",
    );
    // $FlowFixMe: no ConnectionHandler in the stub
    ConnectionHandler.insertEdgeBefore(events, edge);
  },
});
```

</details>

<details>
  <summary>Step 20</summary>

```js
return requestSubscription(this.props.environment, {
  subscription,
  updater: store => {
    const rootField = store.getRootField("eventsFeed");
    const viewer = store.getRoot().getLinkedRecord("viewer");
    // $FlowFixMe: no ConnectionHandler in the stub
    const events = ConnectionHandler.getConnection(viewer, "feed_events");
    // $FlowFixMe: no ConnectionHandler in the stub
    const edge = ConnectionHandler.createEdge(
      store,
      events,
      rootField,
      "EventEdge",
    );
    // $FlowFixMe: no ConnectionHandler in the stub
    ConnectionHandler.insertEdgeBefore(events, edge);
  },
});
```

</details>
