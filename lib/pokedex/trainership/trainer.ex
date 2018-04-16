defmodule Pokedex.Trainership.Trainer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "trainers" do
    field(:display_name, :string)
    belongs_to(:user, Pokedex.Accounts.User)
    has_many(:pokemons, Pokedex.Trainership.Pokemon)

    timestamps()
  end

  @doc false
  def create_changeset(trainer, attrs) do
    trainer
    |> cast(attrs, [:display_name, :user_id])
    |> cast_assoc(:user)
    |> assoc_constraint(:user)
    |> validate_required([:display_name])
  end
end
