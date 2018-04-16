defmodule PokedexWeb.Context do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, current_user} <- authorize(token) do
      %{current_user: current_user}
    else
      _ -> %{}
    end
  end

  defp authorize(token) do
    Pokedex.Guardian.resource_from_token(token)
    |> case do
      {:ok, user, _} -> {:ok, user}
      {:error, reason} -> {:error, reason}
      _ -> {:error, "invalid authorization token"}
    end
  end
end
