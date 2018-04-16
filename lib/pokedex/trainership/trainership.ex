defmodule Pokedex.Trainership do
  import Ecto.Query, warn: false

  alias Ecto.Multi
  alias Pokedex.Repo
  alias Pokedex.Trainership.{Trainer, Pokemon}
  alias Pokedex.Pokemons.Nest

  def create_trainer(attrs \\ %{}) do
    multi =
      Multi.new()
      |> Multi.run(:user, fn _ -> Pokedex.Accounts.create_user(attrs) end)
      |> Multi.run(:trainer, fn %{user: user} -> make_trainer(user) end)

    case Repo.transaction(multi) do
      {:ok, %{user: user}} -> {:ok, user}
      {:error, _, reason, _} -> {:error, reason}
    end
  end

  def make_trainer(%Pokedex.Accounts.User{} = user) do
    %Trainer{}
    |> Trainer.create_changeset(%{user_id: user.id, display_name: user.username})
    |> Repo.insert()
  end

  def get_trainer!(id), do: Repo.get!(Trainer, id)
  def get_pokemon!(id), do: Repo.get!(Pokemon, id)

  def catch_pokemon_in_nest(%Trainer{} = trainer, %Nest{} = nest) do
    nesting = Pokedex.Pokemons.draw_nesting(nest)
    species = nesting.species

    %{
      # :rand.uniform(n) gives a random number from 1 <= x <= n
      height: :rand.uniform(species.max_height - species.min_height + 1) + species.min_height - 1,
      weight: :rand.uniform(species.max_weight - species.min_weight + 1) + species.min_weight - 1,
      species_id: nesting.species_id,
      trainer_id: trainer.id
    }
    |> create_pokemon
  end

  def release_pokemon(nil, _, _), do: {:error, "You have to be signed in to release Pokémons!"}

  def release_pokemon(%Trainer{id: trainer_id}, %Pokemon{trainer_id: pokemon_trainer_id}, _)
      when trainer_id != pokemon_trainer_id,
      do: {:error, "This is not your Pokémon!"}

  def release_pokemon(_, %Pokemon{released_at: released_at}, _) when is_nil(released_at) == false,
    do: {:error, "This Pokémon has already been released!"}

  def release_pokemon(_, %Pokemon{} = pokemon, comment) do
    pokemon
    |> Pokemon.changeset(%{
      released_at: DateTime.utc_now(),
      release_comment: comment
    })
    |> Repo.update()
  end

  defp create_pokemon(attrs) do
    %Pokemon{}
    |> Pokemon.changeset(attrs)
    |> Repo.insert()
  end
end
