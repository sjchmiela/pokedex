defmodule Pokedex.Repo.Migrations.CreatePokemonNestings do
  use Ecto.Migration

  def change do
    create table(:pokemon_nestings) do
      add :probability, :integer
      add :species_id, references(:species, on_delete: :delete_all)
      add :nest_id, references(:pokemon_nests, on_delete: :delete_all)

      timestamps()
    end

    create index(:pokemon_nestings, [:species_id])
    create index(:pokemon_nestings, [:nest_id])
  end
end
