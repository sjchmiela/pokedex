defmodule Pokedex.Pokemons.Nesting do
  use Ecto.Schema
  import Ecto.Changeset

  schema "pokemon_nestings" do
    field(:probability, :integer)
    belongs_to(:species, Pokedex.Pokemons.Species)
    belongs_to(:nest, Pokedex.Pokemons.Nest)

    timestamps()
  end

  @doc false
  def changeset(nesting, attrs) do
    nesting
    |> cast(attrs, [:probability, :species_id, :nest_id])
    |> cast_assoc(:species)
    |> cast_assoc(:nest)
    |> assoc_constraint(:species)
    |> assoc_constraint(:nest)
    |> validate_required([:probability])
  end
end
