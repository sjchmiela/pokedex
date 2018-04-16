defmodule PokedexWeb.Schema.Pokemons do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias PokedexWeb.Resolvers.PokemonsResolver

  node object(:species) do
    field(:slug, :string)

    field(:name, :string) do
      resolve(&PokemonsResolver.species_name/2)
    end

    field(:image_url, :string)
    field(:min_weight, :integer)
    field(:max_weight, :integer)
    field(:min_height, :integer)
    field(:max_height, :integer)
  end

  connection(node_type: :species)

  object :pokemons do
    connection field(:species, node_type: :species) do
      arg(:search_term, :string)
      resolve(&PokemonsResolver.list_species/2)
    end

    field(:species_array, list_of(:species)) do
      resolve(&PokemonsResolver.list_species/2)
    end
  end
end
