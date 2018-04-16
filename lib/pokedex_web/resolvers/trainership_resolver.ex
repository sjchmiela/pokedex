defmodule PokedexWeb.Resolvers.TrainershipResolver do
  import PokedexWeb.Resolvers.Helpers
  alias Pokedex.Repo
  alias Pokedex.Trainership
  alias Trainership.{Pokemon, Trainer}
  alias Pokedex.Accounts.User
  alias Absinthe.Relay.Connection

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

  # STEP 31
  # Implement the `catch_pokemon/2` function.
  # Remember that the second argument will receive a map containing `context`, which is also a map
  # containing `current_user` if valid token was provided in the header.
  # The function have a guard that is valid only when `current_user` is not nil.
  # Use `Pokedex.Pokemons.get_nest_by_token/1` and `Trainership.catch_pokemon_in_nest/1` to implement the function

  # STEP 32
  # Go to GraphiQL and try to use the new mutation. You will find nest tokens on the sheets with QR codes.
  # Also run `mix graphql.schema` to generate new schema description for Relay Compiler.
end
