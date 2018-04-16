defmodule PokedexWeb.Resolvers.AccountsResolver do
  alias Pokedex.{Accounts, Repo}
  alias Accounts.{User}
  alias Absinthe.Relay.Connection

  import PokedexWeb.Resolvers.Helpers

  def list_users(args, _) do
    User
    |> Connection.from_query(&Repo.all/1, args)
  end

  def get_trainer(%User{trainer: %Ecto.Association.NotLoaded{}} = user, args, info),
    do: user |> Repo.preload(:trainer) |> get_trainer(args, info)

  def get_trainer(%User{trainer: trainer}, _, _), do: {:ok, trainer}

  # STEP 4
  # Add the function `create_user` referenced in the previous step.
  # It takes map map of the arguments (mutations inputs) as the first argument.
  # Also remember it should return either {:ok, %{user: %User}}
  # or {:error, reason} in case of an error.
  # To implement the function use `Pokedex.Trainership.create_trainer/1` and
  # the `process_errors` helper from `PokedexWeb.Resolvers.Helpers`.
  # Remember to import the required functions.
  # Docs:
  # * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#resolve/1

  # STEP 5
  # Go to GraphiQL (http://localhost:4000/graphiql) and try to register user using the newly created mutation.
  # Try also to experiment with erroneous inputs (too short password, already taken username).
  # Docs:
  # * http://graphql.org/learn/queries/#mutations

  # STEP 7
  # Add the function `login_user` referenced in the previous step.
  # If successful login it should return {:ok, %{user: %User, token: _token_}}
  # Useful functions:
  # * `Accounts.get_user_by_username`
  # * `Comeonin.Bcrypt.check_pass`
  # * `Pokedex.Guardian.encode_and_sign`
  # Docs:
  # * https://hexdocs.pm/elixir/Kernel.SpecialForms.html#with/1
  # * https://hexdocs.pm/comeonin/Comeonin.Bcrypt.html#check_pass/3
  # * https://hexdocs.pm/guardian/Guardian.html#encode_and_sign/4

  # STEP 8
  # Go to GraphiQL and test the new mutation.

  # STEP 12
  # Implement the `current_user/2` function.
  # The second argument will receive a map containing `context`, which is also a map
  # containing `current_user` if valid token was provided in the header.
  # The function should for:
  # user present in the context - take `current_user` from the context and return `{:ok, current_user}`
  # user absent in the context - return `{:ok, nil}`

  # STEP 13
  # Go to GraphiQL and under Headers choose Standard -> OAuth 2 Bearer Token.
  # Paste the token from step 9 after `Bearer `
  # Now write a query that would return username of currently signed in user.
  # Export the schema with `mix graphql.schema` as we're switching to frontend now!
end
