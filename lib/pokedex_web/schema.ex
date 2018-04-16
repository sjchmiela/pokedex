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

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(:repo, Dataloader.Ecto.new(Pokedex.Repo))

    Map.put(ctx, :loader, loader)
  end
end
