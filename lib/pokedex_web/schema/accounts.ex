defmodule PokedexWeb.Schema.Accounts do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias PokedexWeb.Resolvers.AccountsResolver

  node object(:user) do
    field(:username, :string)

    field(:trainer, :trainer) do
      resolve(&AccountsResolver.get_trainer/3)
    end
  end

  connection(node_type: :user)

  object :accounts do
    connection field(:users, node_type: :user) do
      resolve(&AccountsResolver.list_users/2)
    end

    # STEP 11
    # Add field `me` of type `user`. Use `AccountsResolver.current_user/2` as the resolve function.
  end

  # STEP 2
  # Add a new object `:accounts_mutations` (that we imported in the mutation block in the previous step)
  # Docs:
  # * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#object/3

  # STEP 3
  # In the `accounts_mutations` object add a new mutation `register` using `payload` macro.
  # Make it accept `username` and `password` (of type `non_null(string)`)
  # and return a single field `user` of type `user`.
  # Use `AccountsResolver.create_user/2` as the resolve function.
  # Docs:
  # * https://hexdocs.pm/absinthe_relay/Absinthe.Relay.Mutation.Notation.Modern.html
  # * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#non_null/1

  # STEP 6
  # Add a new mutation `login` by analogy to `register`. Inputs should be the same,
  # outputs except `user` field should have `token` field of type `string` - it will
  # return token used to authenticate queries.
  # Use `AccountsResolver.login_user/2` as the resolve function.
end
