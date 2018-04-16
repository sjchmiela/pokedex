defmodule PokedexWeb.Schema.Accounts do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  # STEP 5
  # Import the dataloader/1 helper macro from Absinthe.Resolution.Helpers.

  alias PokedexWeb.Resolvers.AccountsResolver

  node object(:user) do
    field(:username, :string)
    # STEP 6
    # Use the dataloader/1 macro to implement the resolve function.
    # dataloader/1 expects a single argument -- a key under which
    # the dataloader is stored in the context.
    # (You've added this context/1 in Step 4 in lib/pokedex_web/schema.ex).
    # https://hexdocs.pm/absinthe/ecto.html#dataloader
    field(:trainer, :trainer) do
      resolve(&AccountsResolver.get_trainer/3)
    end

    # STEP 7
    # Open the GraphiQL tool and ensure that the query for user's trainer
    # works properly, you can use:
    # query {
    #   me {
    #     trainer {
    #       displayName
    #     }
    #   }
    # }
  end

  connection(node_type: :user)

  object :accounts do
    connection field(:users, node_type: :user) do
      resolve(&AccountsResolver.list_users/2)
    end

    field :me, :user do
      resolve(&AccountsResolver.current_user/2)
    end
  end

  object :accounts_mutations do
    payload field(:register) do
      input do
        field(:username, non_null(:string))
        field(:password, non_null(:string))
      end

      output do
        field(:user, :user)
      end

      resolve(&AccountsResolver.create_user/2)
    end

    payload field(:login) do
      input do
        field(:username, non_null(:string))
        field(:password, non_null(:string))
      end

      output do
        field(:user, :user)
        field(:token, non_null(:string))
      end

      resolve(&AccountsResolver.login_user/2)
    end
  end
end
