defmodule Pokedex.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:password_hash, :string)
    field(:password, :string, virtual: true)
    field(:username, :string)
    has_one(:trainer, Pokedex.Trainership.Trainer)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> unique_constraint(:username)
    |> validate_required([:username, :password])
    |> validate_length(:password, min: 6)
    |> hash_password
  end

  defp hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))

      _ ->
        changeset
    end
  end
end
