defmodule Pokedex.Repo.Migrations.CreateSpecies do
  use Ecto.Migration

  def change do
    create table(:species) do
      add(:slug, :string, null: false)
      add(:image_url, :string, null: false)
      add(:min_height, :integer, null: false)
      add(:max_height, :integer, null: false)
      add(:min_weight, :integer, null: false)
      add(:max_weight, :integer, null: false)

      timestamps()
    end

    create(index(:species, [:slug], unique: true))
  end
end
