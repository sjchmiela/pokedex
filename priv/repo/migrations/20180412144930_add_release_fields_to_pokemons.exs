defmodule Pokedex.Repo.Migrations.AddReleaseFieldsToPokemons do
  use Ecto.Migration

  def change do
    alter table(:pokemons) do
      add(:released_at, :naive_datetime)
      add(:release_comment, :string)
    end
  end
end
