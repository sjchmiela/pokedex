defmodule Pokedex.Repo.Migrations.CreatePokemonNests do
  use Ecto.Migration

  def change do
    create table(:pokemon_nests) do
      add :token, :string
      add :deleted_at, :naive_datetime

      timestamps()
    end

    create unique_index(:pokemon_nests, [:token])
  end
end
