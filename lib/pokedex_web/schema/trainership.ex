defmodule PokedexWeb.Schema.Trainership do
  use Absinthe.Schema.Notation
  alias Absinthe.Relay.Connection
  use Absinthe.Relay.Schema.Notation, :modern
  import Absinthe.Resolution.Helpers, only: [dataloader: 1, on_load: 2]

  alias PokedexWeb.Resolvers.TrainershipResolver

  node object(:trainer) do
    field(:display_name, :string)
    field(:user, :user, resolve: dataloader(:repo))

    connection field(:pokemons, node_type: :pokemon) do
      resolve(fn trainer, args, %{context: %{loader: loader}} ->
        loader
        |> Dataloader.load(:repo, :pokemons, trainer)
        |> on_load(fn loader ->
          loader
          |> Dataloader.get(:repo, :pokemons, trainer)
          |> Connection.from_list(args)
        end)
      end)
    end
  end

  connection(node_type: :pokemon)

  node object(:pokemon) do
    field(:height, :integer)
    field(:weight, :integer)
    field(:released_at, :datetime)
    field(:release_comment, :string)
    field(:species, :species, resolve: dataloader(:repo))
    field(:trainer, :trainer, resolve: dataloader(:repo))

    field(:caught_at, :datetime) do
      resolve(fn pokemon, _, _ -> {:ok, pokemon.inserted_at} end)
    end
  end

  interface :event do
    field(:id, non_null(:id))
    field(:at, :datetime)

    resolve_type(fn
      %{type: :released}, _ -> :event_released
      %{type: :caught}, _ -> :event_caught
      _, _ -> nil
    end)
  end

  connection(node_type: :event)

  object(:viewer) do
    field(:id, :id, resolve: fn _, _ -> {:ok, "viewer"} end)

    connection field(:events, node_type: :event) do
      resolve(&TrainershipResolver.list_events/2)
    end
  end

  node object(:event_caught, id_fetcher: fn event, _ -> event.pokemon.id end) do
    field(:at, :datetime) do
      resolve(fn event, _, _ -> {:ok, event.pokemon.inserted_at} end)
    end

    interface(:event)

    field(:pokemon, :pokemon) do
      resolve(fn event, _, _ -> {:ok, event.pokemon} end)
    end
  end

  node object(:event_released, id_fetcher: fn event, _ -> event.pokemon.id end) do
    field(:at, :datetime) do
      resolve(fn event, _, _ -> {:ok, event.pokemon.released_at} end)
    end

    interface(:event)

    field(:pokemon, :pokemon) do
      resolve(fn event, _, _ -> {:ok, event.pokemon} end)
    end

    field :comment, :string do
      resolve(fn event, _, _ -> {:ok, event.pokemon.release_comment} end)
    end
  end

  object :trainership do
    field(:viewer, :viewer, resolve: fn _, _ -> {:ok, %{}} end)
  end

  object :traninership_subscriptions do
    field :events_feed, :event do
      config(fn _, _ ->
        {:ok, topic: "event_feed"}
      end)

      trigger(:catch_pokemon, topic: fn _ -> "event_feed" end)
      trigger(:release_pokemon, topic: fn _ -> "event_feed" end)

      resolve(fn event, _, _ ->
        Map.fetch(event, :event)
      end)
    end
  end

  object :trainership_mutations do
    payload field(:catch_pokemon) do
      input do
        field(:nest_token, non_null(:string))
      end

      output do
        field(:event, :event_caught)
      end

      resolve(&TrainershipResolver.catch_pokemon/2)
    end

    payload field(:release_pokemon) do
      input do
        field(:pokemon_id, non_null(:id))
        field(:comment, non_null(:string))
      end

      output do
        field(:event, :event_released)
      end

      middleware(Absinthe.Relay.Node.ParseIDs, pokemon_id: :pokemon)

      resolve(&TrainershipResolver.release_pokemon/2)
    end
  end
end
