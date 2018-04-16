defmodule PokedexWeb.Resolvers.AccountsResolver do
  import PokedexWeb.Resolvers.Helpers

  alias Pokedex.{Accounts, Repo}
  alias Accounts.{User}
  alias Absinthe.Relay.Connection

  def list_users(args, _) do
    User
    |> Connection.from_query(&Repo.all/1, args)
  end

  def current_user(_, %{context: %{current_user: current_user}}) do
    {:ok, current_user}
  end

  def current_user(_, _) do
    {:ok, nil}
  end

  def create_user(args, _) do
    case Pokedex.Trainership.create_trainer(args) do
      {:ok, user} ->
        {:ok, %{user: user}}

      {:error, errors} ->
        {:error, errors |> process_errors}
    end
  end

  def login_user(%{username: username, password: password}, _) do
    with user <- Accounts.get_user_by_username(username),
         {:ok, user} <- Comeonin.Bcrypt.check_pass(user, password),
         {:ok, token, _} <- Pokedex.Guardian.encode_and_sign(user) do
      {:ok, %{user: user, token: token}}
    else
      _ -> {:error, "Invalid credentials provided"}
    end
  end

  def get_trainer(%User{trainer: %Ecto.Association.NotLoaded{}} = user, args, info),
    do: user |> Repo.preload(:trainer) |> get_trainer(args, info)

  def get_trainer(%User{trainer: trainer}, _, _), do: {:ok, trainer}
end
