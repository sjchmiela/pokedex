defmodule PokedexWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern

  object :datetime do
    field(:iso8601, :string) do
      resolve(fn datetime, _, _ ->
        datetime_string =
          case datetime do
            %DateTime{} ->
              DateTime.to_iso8601(datetime)

            %NaiveDateTime{} ->
              # we want timezone info
              DateTime.to_iso8601(DateTime.from_naive!(datetime, "Etc/UTC"))

            nil ->
              nil
          end

        {:ok, datetime_string}
      end)
    end
  end

  import_types(PokedexWeb.Schema.Accounts)
  import_types(PokedexWeb.Schema.Pokemons)
  import_types(PokedexWeb.Schema.Trainership)
  import_types(PokedexWeb.Schema.Relay)

  query do
    import_fields(:accounts)
    import_fields(:pokemons)
    import_fields(:relay)
    import_fields(:trainership)
  end

  mutation do
    import_fields(:accounts_mutations)
    import_fields(:trainership_mutations)
  end

  subscription do
    import_fields(:traninership_subscriptions)
  end

  # STEP 3 
  # Add Absinthe.Middleware.Dataloader plugin to the list of used plugins.
  # https://hexdocs.pm/absinthe/ecto.html#dataloader

  # STEP 4
  # Add Dataloader to resolution context. 
  # We recommend using Dataloader.Ecto with Pokedex.Repo.
  # Remember the name under which you register the loader. (We'd use eg. :repo.)
  # Using Dataloader in Absinthe: https://hexdocs.pm/absinthe/ecto.html#dataloader
  # Dataloader.Ecto: https://hexdocs.pm/dataloader/Dataloader.Ecto.html#content
end
