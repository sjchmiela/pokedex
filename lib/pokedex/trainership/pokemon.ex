defmodule Pokedex.Trainership.Pokemon do
  use Ecto.Schema
  import Ecto.Changeset

  schema "pokemons" do
    field(:height, :integer)
    field(:weight, :integer)
    field(:released_at, :naive_datetime)
    field(:release_comment, :string)
    belongs_to(:species, Pokedex.Pokemons.Species)
    belongs_to(:trainer, Pokedex.Trainership.Trainer)

    timestamps()
  end

  @doc false
  def changeset(pokemon, attrs) do
    pokemon
    |> cast(attrs, [:height, :weight, :species_id, :trainer_id, :released_at, :release_comment])
    |> cast_assoc(:species)
    |> cast_assoc(:trainer)
    |> assoc_constraint(:species)
    |> assoc_constraint(:trainer)
    |> validate_required([:height, :weight])
  end
end
