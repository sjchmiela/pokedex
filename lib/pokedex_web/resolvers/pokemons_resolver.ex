defmodule PokedexWeb.Resolvers.PokemonsResolver do
  alias Pokedex.{Repo, Pokemons.Species}

  def list_species(_, _) do
    pokemons = Repo.all(Species)
    {:ok, pokemons}
  end

  def species_name(%Species{slug: slug}, _, _), do: {:ok, String.capitalize(slug)}

  # STEP 7
  # Create a function here that will take two arguments (field arguments and info)
  # and will use Absinthe.Relay.Connection.from_query function to return
  # appropriate results for the query.
  # See example at
  # https://hexdocs.pm/absinthe_relay/Absinthe.Relay.Connection.html#from_query/4
  # Note that Absinthe recommends adding an order_by clause to the query.
  # For order_by to work you'll need to import it from Ecto.Query.

  # STEP 26
  # Let's implement the search. With argument defined in the connection field,
  # first argument of our pagination function will receive the search term
  # under the :search_term key.
  #
  # Implement a second function clause that when the term is not nil
  # not only orders Species by the id, but also runs a where clause
  # checking whether slug is like lowercased term.
  #
  # Remember to put it above the generic args one.
  # Also, remember to import where function from Ecto.Query.
  #
  # Refresh the GraphQL schema by running mix graphql.schema and restarting the phx server.
end
