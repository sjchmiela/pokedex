defmodule Pokedex.Accounts do
  import Ecto.Query, warn: false
  alias Pokedex.Repo

  alias Pokedex.Accounts.User

  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by_username(username) do
    User
    |> where([u], u.username == ^username)
    |> Repo.one()
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end
end
