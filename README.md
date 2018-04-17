# Polymorphism

## Motivation

Consider the `FeedPage` component and it's query fragment.

```graphql
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
```

You can probably see a couple of problems:

1.  we have to request contents of two different connections of different types,
2.  we practically request the same fields on the events on both types (the `id`, `at.iso8601` and `typename: __typename` part),
3.  pagination can't work as it is supposed to, if we would make a "load more" button in the `FeedPage`, it would have to query 5 more events of each type, but only show 10 of them (notice we have to up to 20 events of each type for pagination to work properly),
4.  moreover, `EventRow` expects `event` prop to be of certain shape. If we'd like to update `EventRow` to use some other `event` field, we would have to remember to update queries in all the components that use `EventRow` to also include the new fields.

[Wouldn't it be good](https://www.youtube.com/watch?v=cTLTG4FTNBQ) if we could extract the common fields from both event types? Yes, it would! Just as in good ol' object oriented programming languages, GraphQL has [a notion of interfaces](http://graphql.org/learn/schema/#interfaces).

[Wouldn't it be good](https://www.youtube.com/watch?v=dQw4w9WgXcQ) if we could make a single connection returning nodes of this interface type?

## Solution

You guessed it! [Interfaces](http://graphql.org/learn/schema/#interfaces)!

Follow the STEPs to fix this ugly FeedPage code.

## References

* https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#interface/3

## Spoilers

<details>
  <summary>Step 1</summary>

```elixir
interface :event do
  field(:id, non_null(:id))
  field(:at, :datetime)
end
```

</details>

<details>
  <summary>Step 2</summary>

```elixir
interface :event
```

</details>

<details>
  <summary>Step 3</summary>

```elixir
interface :event
```

</details>

<details>
  <summary>Step 6</summary>

```elixir
connection(node_type: :event)
```

</details>

<details>
  <summary>Step 6</summary>

```elixir
connection field(:events, node_type: :event) do
  resolve(&TrainershipResolver.list_events/2)
end
```

</details>

<details>
  <summary>Step 8</summary>

```elixir
def get_events() do
  get_caught_events() ++ get_released_events()
  |> Enum.sort(fn a, b ->
    case NaiveDateTime.compare(a.at, b.at) do
      :gt -> false
      _ -> true
    end
  end)
end
```

</details>

<details>
  <summary>Step 9</summary>

```elixir
def list_events(args, _) do
  Trainership.get_events()
  |> Absinthe.Relay.Connection.from_list(args)
end
```

</details>

<details>
  <summary>Step 12</summary>

```graphql
query FeedPageQuery {
  viewer {
    id
    events(last: 10) {
      edges {
        node {
          id
          at {
            iso8601
          }
          typename: __typename
          ...EventCaughtRow_event
          ...EventReleasedRow_event
        }
      }
    }
  }
}
```

</details>

<details>
  <summary>Step 13</summary>

```javascript
const events = this.props.viewer.events;
```

</details>

<details>
  <summary>Step 14</summary>

```javascript
const events = this.props.viewer.events.slice().reverse();
```

</details>

<details>
  <summary>Step 16</summary>

```javascript
import { graphql, createFragmentContainer } from "react-relay";
```

</details>

<details>
  <summary>Step 17</summary>

```javascript
const StyledEventRow = withStyles(styles)(EventRow);
```

</details>

<details>
  <summary>Step 18</summary>

```javascript
export default createFragmentContainer(StyledEventRow, {
  event: graphql`
    fragment EventRow_event on Event {
      id
      at {
        iso8601
      }
      typename: __typename
      ...EventCaughtRow_event
      ...EventReleasedRow_event
    }
  `,
});
```

</details>

<details>
  <summary>Step 19</summary>

```javascript
import EventRow_event from "./__generated__/EventRow_event";

type PropsType = {
  event: EventRow_event,
  // ...
};

class EventRow extends React.Component<PropsType> {
  renderConcreteEvent = (event: EventRow_event) => {
    // ...
```

</details>

<details>
  <summary>Step 20</summary>

```graphql
query FeedPageQuery {
  viewer {
    id
    events(last: 10) {
      edges {
        node {
          id
          ...EventRow_event
        }
      }
    }
  }
}
```

</details>
