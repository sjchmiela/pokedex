defmodule PokedexWeb.Schema.Trainership do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  # STEP 8
  # Import the dataloader/1 helper macro from Absinthe.Resolution.Helpers.
  # (You've already done this in PokedexWeb.Schema.Accounts in step 5.)

  # STEP 9
  # Find 3 plain fields and use dataloader/1 to load the requested data.

  # STEP 10
  # Open up GraphiQL and ensure that the resolving works properly.
  # query {
  #   me {
  #     trainer {
  #       user {
  #         id
  #       }
  #       pokemons(first: 5) {
  #         edges {
  #           node {
  #             species {
  #               name
  #             }
  #           }
  #         }
  #       }
  #     }
  #   }
  # }

  # STEP 11
  # Admire the beauty of this solution.

  # STEP 12
  # Consider the connection field for pokemons on type trainer.
  # Try to implement a custom resolve function, which will fetch the loader
  # from the context and use it to download all the pokemons of the trainer
  # and pass the list of all pokemons to the appropriate Absinthe.Relay.Connection.from_list/3.
  # For inspiration go to https://hexdocs.pm/absinthe/Absinthe.Resolution.Helpers.html#on_load/2.
  # (Note: You will need more than dataloader/1 from Absinthe.Resolution.helpers.)

  alias PokedexWeb.Resolvers.TrainershipResolver

  node object(:trainer) do
    field(:display_name, :string)
    field(:user, :user) do
      resolve(&TrainershipResolver.trainers_user/3)
    end

    connection field(:pokemons, node_type: :pokemon) do
      resolve(&TrainershipResolver.trainers_pokemons/3)
    end
  end

  connection(node_type: :pokemon)

  node object(:pokemon) do
    field(:height, :integer)
    field(:weight, :integer)
    field(:released_at, :datetime)
    field(:release_comment, :string)
    field(:species, :species) do
      resolve(&TrainershipResolver.pokemon_species/3)
    end
    field(:trainer, :trainer) do
      resolve(&TrainershipResolver.pokemon_trainer/3)
    end

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
