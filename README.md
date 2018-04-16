# Batching

## Motivation

Consider the following query:

```graphql
query {
  me {
    trainer {
      pokemons(first: 5) {
        edges {
          node {
            species {
              name
            }
          }
        }
      }
    }
  }
}
```

We can easily see, that querying `pokemons` and then `species` triggers an N+1 query problem — we fetch 5 Pokemons and then for each Pokemon we make a request to the database for the species of the Pokemon. It would get even worse if you'd add a `node.trainer` field, like this:

```graphql
query {
  me {
    trainer {
      pokemons(first: 5) {
        edges {
          node {
            species {
              name
            }
            trainer {
              displayName
            }
          }
        }
      }
    }
  }
}
```

Then you'd get `2*N + 1` query, which is obviously bad.

## Solution

Fortunately, there are tools that help us fix this problem.

Behold… `Absinthe.Middleware.{Batch, DataLoader}`.

### Basic batching

We could implement batching the basic way — for a short introduction see (https://hexdocs.pm/absinthe/Absinthe.Middleware.Batch.html). However, there is a more automatic, but still generic way to batch the data loading.

### [DataLoader](https://github.com/facebook/dataloader)

> DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a simplified and consistent API over various remote data sources such as databases or web services via batching and caching.

Absinthe provides its own implementation at (https://github.com/absinthe-graphql/dataloader). Using this tool in Absinthe GraphQL is extremely easy. Follow the steps to add batching to our Pokedex application.

## References

https://hexdocs.pm/absinthe/ecto.html#avoiding-n-1-queries

## Spoilers

<details>
  <summary>Step 1</summary>

```elixir
{:dataloader, "~> 1.0.2"}
```

</details>

<details>
  <summary>Step 3</summary>

```elixir
def plugins do
  [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
end
```

</details>

<details>
  <summary>Step 4</summary>

```elixir
def context(ctx) do
  loader =
    Dataloader.new()
    |> Dataloader.add_source(:repo, Dataloader.Ecto.new(Pokedex.Repo))
  Map.put(ctx, :loader, loader)
end
```

</details>

<details>
  <summary>Step 5</summary>

```elixir
import Absinthe.Resolution.Helpers, only: [dataloader: 1]
```

</details>

<details>
  <summary>Step 6</summary>

```elixir
field(:trainer, :trainer, resolve: dataloader(:repo))
```

</details>

<details>
  <summary>Step 8</summary>

```elixir
import Absinthe.Resolution.Helpers, only: [dataloader: 1]
```

</details>

<details>
  <summary>Step 9</summary>

```elixir
# Trainer.user
field(:user, :user, resolve: dataloader(:repo))

# Pokemon.species

field(:user, :user, resolve: dataloader(:repo))

# Pokemon.trainer

field(:user, :user, resolve: dataloader(:repo))
```

</details>

<details>
  <summary>Step 12</summary>

```elixir
# At the top of the file
import Absinthe.Resolution.Helpers, only: [dataloader: 1, on_load: 2]

# Inside connection field(:pokemons, node_type: :pokemon)

resolve(fn trainer, args, %{context: %{loader: loader}} ->
loader
|> Dataloader.load(:repo, :pokemons, trainer)
|> on_load(fn loader ->
loader
|> Dataloader.get(:repo, :pokemons, trainer)
|> Connection.from_list(args)
end)
end)

```
</details>
```
