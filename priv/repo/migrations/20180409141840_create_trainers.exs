defmodule Pokedex.Repo.Migrations.CreateTrainers do
  use Ecto.Migration

  def change do
    create table(:trainers) do
      add(:display_name, :string, null: false)
      add(:user_id, references(:users, on_delete: :delete_all), null: false)

      timestamps()
    end

    create(unique_index(:trainers, [:user_id]))
  end
end
