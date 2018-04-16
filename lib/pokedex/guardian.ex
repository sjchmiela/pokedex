defmodule Pokedex.Guardian do
  use Guardian, otp_app: :pokedex
  alias Pokedex.Accounts
  alias Accounts.User
  alias Pokedex.Repo

  def subject_for_token(%User{id: id}, _claims) do
    {:ok, to_string(id)}
  end

  def subject_for_token(_, _) do
    {:error, :could_not_generate_token}
  end

  def resource_from_claims(%{"sub" => sub}) do
    user = Accounts.get_user!(sub) |> Repo.preload(:trainer)
    {:ok, user}
  end

  def resource_from_claims(_, _) do
    {:error, :could_not_resolve_user}
  end
end
