defmodule Pokedex.Pokemons.Species do
  use Ecto.Schema
  import Ecto.Changeset

  schema "species" do
    field(:image_url, :string)
    field(:max_height, :integer)
    field(:max_weight, :integer)
    field(:min_height, :integer)
    field(:min_weight, :integer)
    field(:slug, :string)

    has_many(:nestings, Pokedex.Pokemons.Nesting)

    timestamps()
  end

  @doc false
  def changeset(species, attrs) do
    species
    |> cast(attrs, [:slug, :image_url, :min_height, :max_height, :min_weight, :max_weight])
    |> validate_required([:slug, :image_url, :min_height, :max_height, :min_weight, :max_weight])
  end
end
