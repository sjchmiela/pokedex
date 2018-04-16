defmodule Pokedex.Repo.Migrations.CreatePokemons do
  use Ecto.Migration

  def change do
    create table(:pokemons) do
      add(:height, :integer, null: false)
      add(:weight, :integer, null: false)
      add(:species_id, references(:species, on_delete: :delete_all))
      add(:trainer_id, references(:trainers, on_delete: :delete_all))

      timestamps()
    end

    create(index(:pokemons, [:species_id]))
    create(index(:pokemons, [:trainer_id]))
  end
end
