defmodule PokedexWeb.Resolvers.PokemonsResolver do
  import Ecto.Query, only: [where: 3]
  alias Pokedex.{Repo, Pokemons}
  alias Pokemons.{Species}
  alias Absinthe.Relay.Connection

  def species_name(_, %{source: %{slug: slug}}) do
    {:ok, String.capitalize(slug)}
  end

  def list_species(args, _) when map_size(args) == 0 do
    species =
      Species
      |> Repo.all()

    {:ok, species}
  end

  def list_species(%{search_term: term} = args, _) when is_nil(term) == false do
    # This runs the `where` clause even when the term == "",
    # but as premature optimization is the root of all evil,
    # I'll leave it like this.
    Species
    |> where([s], like(s.slug, ^"%#{String.replace(term, "%", "\\%")}%"))
    |> Connection.from_query(&Repo.all/1, args)
  end

  def list_species(args, _) do
    Species
    |> Connection.from_query(&Repo.all/1, args)
  end
end
