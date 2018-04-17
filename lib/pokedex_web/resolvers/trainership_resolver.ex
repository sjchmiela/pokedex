defmodule PokedexWeb.Resolvers.TrainershipResolver do
  import PokedexWeb.Resolvers.Helpers
  alias Pokedex.Repo
  alias Pokedex.Trainership
  alias Trainership.{Pokemon, Trainer}
  alias Absinthe.Relay.Connection
  alias Pokedex.Accounts.User
  import Ecto.Query, only: [from: 2]

  def trainers_user(%Trainer{user: %Ecto.Association.NotLoaded{}} = trainer, args, info),
    do: trainer |> Repo.preload(:user) |> trainers_user(args, info)

  def trainers_user(%Trainer{user: user}, _args, _info), do: {:ok, user}

  def trainers_pokemons(%Trainer{pokemons: %Ecto.Association.NotLoaded{}} = trainer, args, _info),
    do:
      from(p in Pokemon, where: p.trainer_id == ^trainer.id, order_by: [desc: :inserted_at])
      |> Connection.from_query(&Repo.all/1, args)

  def trainers_pokemons(%Trainer{pokemons: pokemons}, args, _info),
    do: Connection.from_list(pokemons, args)

  def pokemon_species(%Pokemon{species: %Ecto.Association.NotLoaded{}} = pokemon, args, info),
    do: pokemon |> Repo.preload(:species) |> pokemon_species(args, info)

  def pokemon_species(%Pokemon{species: species}, _args, _info), do: {:ok, species}

  def pokemon_trainer(%Pokemon{trainer: %Ecto.Association.NotLoaded{}} = pokemon, args, info),
    do: pokemon |> Repo.preload(:trainer) |> pokemon_trainer(args, info)

  def pokemon_trainer(%Pokemon{trainer: trainer}, _args, _info), do: {:ok, trainer}

  def catch_pokemon(%{nest_token: token}, %{context: %{current_user: %User{trainer: trainer}}})
      when is_nil(trainer) == false do
    with {:ok, nest} <- Pokedex.Pokemons.get_nest_by_token(token),
         {:ok, pokemon} <- Trainership.catch_pokemon_in_nest(trainer, nest) do
      {:ok, %{event: %{pokemon: pokemon, type: :caught}}}
    else
      {:error, errors} -> {:error, process_errors(errors)}
    end
  end

  def release_pokemon(%{pokemon_id: pokemon_id, comment: comment}, info) do
    trainer = info.context.current_user.trainer
    pokemon = Trainership.get_pokemon!(pokemon_id)

    case Trainership.release_pokemon(trainer, pokemon, comment) do
      {:ok, pokemon} -> {:ok, %{event: %{pokemon: pokemon, type: :released}}}
      {:error, errors} -> {:error, process_errors(errors)}
    end
  end

  def list_caught_events(args, _) do
    Trainership.get_caught_events()
    |> Absinthe.Relay.Connection.from_list(args)
  end

  def list_released_events(args, _) do
    Trainership.get_released_events()
    |> Absinthe.Relay.Connection.from_list(args)
  end

  # STEP 9
  # Let's implement the resolve function!
  # Create a function matching name and arity of the function
  # you've pointed resolve to in previous step.
  #
  # To fetch the events list you can use Trainership.get_events/0,
  # you've created in the previous step.

  # STEP 10
  # Open up GraphiQL and try to fetch 5 last events with the newly
  # created events connection field. Query for __typename field
  # to see concrete types hidden behind the interface.
  # Ensure that by default you can only query the fields that are
  # defined by Event.
  #
  # Note that to access a specific type implementing the interface
  # you can use inline fragments:
  #
  # ...
  #   node {
  #     # node is of type Edge
  #     ... on EventReleased {
  #       # We can spread a conditional fragment
  #       # on any of the implementations
  #       # it will only resolve if the node is of type EventReleased.
  #       comment
  #     }
  #   }
  # ...
end
