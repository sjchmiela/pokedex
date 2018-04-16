defmodule PokedexWeb.Resolvers.TrainershipResolver do
  import PokedexWeb.Resolvers.Helpers
  alias Pokedex.Repo
  alias Pokedex.Trainership
  alias Trainership.{Pokemon}
  alias Pokedex.Accounts.User
  import Ecto.Query, only: [from: 2]

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

  def list_events(args, _) do
    caught =
      from(p in Pokemon, order_by: [desc: :inserted_at])
      |> Repo.all()
      |> Enum.map(fn pokemon -> %{pokemon: pokemon, type: :caught, at: pokemon.inserted_at} end)

    released =
      from(p in Pokemon, order_by: [desc: :inserted_at], where: not is_nil(p.released_at))
      |> Repo.all()
      |> Enum.map(fn pokemon -> %{pokemon: pokemon, type: :released, at: pokemon.released_at} end)

    Enum.concat(caught, released)
    |> Enum.sort(fn a, b -> if NaiveDateTime.compare(a.at, b.at) != :gt, do: true, else: false end)
    |> Enum.reverse()
    |> Absinthe.Relay.Connection.from_list(args)
  end
end
