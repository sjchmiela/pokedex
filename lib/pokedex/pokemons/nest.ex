defmodule Pokedex.Pokemons.Nest do
  use Ecto.Schema
  import Ecto.Changeset

  schema "pokemon_nests" do
    field(:deleted_at, :naive_datetime)
    field(:token, :string)
    has_many(:nestings, Pokedex.Pokemons.Nesting)

    timestamps()
  end

  @doc false
  def changeset(nest, attrs) do
    nest
    |> cast(attrs, [:token, :deleted_at])
    |> validate_required([:token])
    |> unique_constraint(:token)
  end
end
