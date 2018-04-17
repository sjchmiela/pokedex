defmodule PokedexWeb.Schema do
  use Absinthe.Schema
  # STEP 2
  # As noted in absinthe_relay usage guide, we have to
  # use Absinthe.Relay.Schema module to import its macros.
  # Note in this project we're using Relay modern.

  alias PokedexWeb.Resolvers.PokemonsResolver

  # STEP 10
  # Once we've defined our Node interface we can implement make
  # Species type implement it. Fortunately, with Absinthe is as simple
  # as prepending the object :species with node keyword.
  # https://hexdocs.pm/absinthe_relay/Absinthe.Relay.Node.html#module-object
  # We can event remove the field(:id) from the object definition --
  # -- node handles this for us.
  object :species do
    field(:id, non_null(:id))
    field(:slug, :string)
    field(:name, :string, resolve: &PokemonsResolver.species_name/3)
    field(:image_url, :string)
    field(:min_height, :integer)
    field(:max_height, :integer)
    field(:min_weight, :integer)
    field(:max_weight, :integer)
  end

  # STEP 3
  # Let's define the connection type for node_type of :species.
  # For inspiration go to
  # https://hexdocs.pm/absinthe_relay/Absinthe.Relay.Connection.html#module-connection

  query do
    field :number_one, :integer do
      resolve(fn _, _ -> {:ok, 1} end)
    end

    field :species_array, list_of(:species) do
      resolve(&PokemonsResolver.list_species/2)
    end

    # STEP 4
    # Define a connection field of nodes of type species.
    # We will have to define a custom resolve function.
    # For now let's get a whole list of Pokemons
    # with PokemonsResolver.list_species(args, info)
    # and forward them to Absinthe.Relay.Connection.from_list/3 helper
    # https://hexdocs.pm/absinthe_relay/Absinthe.Relay.Connection.html#from_list/3

    # STEP 25
    # Add an argument to our species connection field.
    # The argument should be named something like searchTerm and be of type string.
    # https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#arg/3

    # STEP 5
    # Open up GraphiQL, refresh the page and ensure that you can fetch
    # first ten species' names. Use GraphiQL autocompletion for help.

    # STEP 6
    # The way we've implemented this is obviously wrong.
    # 1. We implement a resolve function and ten call resolver from there,
    # 2. We fetch all the pokemon species only to return a couple of them
    #    to the client.
    # Let's fix these problems.

    # STEP 8
    # Remove resolve function above and replace with a reference to a function
    # created in Step 7.

    # STEP 11
    # If you'd query now for id field of species you would get a strange
    # string as value -- eg. "U3BlY2llczox". This is in fact Base.encode64(Species:1).
    # This gives us a nice way to be able to identify objects globally,
    # but there is no way to query for objects with that value.
    #
    # For that we have to define a special "node field" on the RootQueryType.
    # https://hexdocs.pm/absinthe_relay/Absinthe.Relay.Node.html#module-field
    #
    # Implement a node field with the documentation provided.
    # Note that type value that you receive here in the first argument map
    # is the same type that is returned in node interface function.
    # Use the id and Pokedex.Repo to get given Species and return. ({:ok, species})

    # STEP 12
    # Open up GraphiQL and try the following query:
    # query {
    #   node(id: "U3BlY2llczox") {
    #     id
    #     ... on Species {
    #       name
    #     }
    #   }
    # }
    # When this query is run, behind the scenes the ID is decoded,
    # then passed to resolve function of node field, which returns given species.
    # Then, the species is passed into node interface resolve_type function
    # which returns as which object type should the species be interpreted. Et voilà!
  end

  # STEP 9
  # Our Relay integration is incomplete. Relay standard introduces a notion of
  # a Node interface -- an interface that should be implemented by all the object types
  # (more on Interfaces later, for now let's just say that they work just like
  # interfaces in a traditional OO programming). The Node interface requires
  # objects to implement an id field of type ID (http://graphql.org/graphql-js/type/#graphqlid).
  #
  # This interface comes in handy when we introduce another thing that Relay
  # requires from the GraphQL backend -- a special field defined on RootQueryType
  # node(id: ID!).
  #
  # This field allows Relay to query for additional properties of a given object
  # without having to repeat the whole query with additional arguments.
  #
  # Consider the following query:
  # query {
  #   species(first: 10) {
  #     edges {
  #       node {
  #         id
  #         name
  #         imageUrl
  #       }
  #     }
  #   }
  # }
  # Once results of that query are saved to memory, the client knows about 10 first species
  # and their names. Imagine that this is used to render a list of Pokemon species
  # in a webpage sidebar (not too hard to imagine, huh?). Now let's say that
  # the user is able to expand information about a species and the expanded information
  # show Pokemons minWeight and maxWeight.
  #
  # Should the client refetch the query with {min,max}Weight included in the node field?
  #
  # There is a better way!
  #
  # The client knowing the id of the expanded species can issue the following query:
  # node(id: id) {
  #   ... on Species {
  #     minWeight, maxWeight
  #   }
  # }
  # This query fetches {min,max}Weight of only the one species of id == id. Nothing else!
  # Such field helps optimize the need to refetch obsolete data from the backend.
  #
  # Let's add this to our schema.
  #
  # First, we need to define that Node interface in our schema.
  # For that we will use node interface macro
  # https://hexdocs.pm/absinthe_relay/Absinthe.Relay.Node.html#module-interface
  # Implement the node interface resolve_type function.
  # Note that you can pattern match on the struct provided. :)
end
