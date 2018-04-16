defmodule PokedexWeb.Schema.Trainership do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias PokedexWeb.Resolvers.TrainershipResolver

  node object(:trainer) do
    field(:display_name, :string)

    field(:user, :user) do
      resolve(&TrainershipResolver.trainers_user/3)
    end

    connection field(:pokemons, node_type: :pokemon) do
      resolve(&TrainershipResolver.trainers_pokemons/3)
    end
  end

  connection(node_type: :pokemon)

  node object(:pokemon) do
    field(:height, :integer)
    field(:weight, :integer)
    field(:released_at, :datetime)
    field(:release_comment, :string)

    field(:species, :species) do
      resolve(&TrainershipResolver.pokemon_species/3)
    end

    field(:trainer, :trainer) do
      resolve(&TrainershipResolver.pokemon_trainer/3)
    end

    field(:caught_at, :datetime) do
      resolve(fn pokemon, _, _ -> {:ok, pokemon.inserted_at} end)
    end
  end

  # STEP 29
  # Add a new object `:trainership_mutations` (that we imported in the mutation block in the previous step)
  # Docs:
  # * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#object/3

  # STEP 30
  # In the `trainership_mutations` object add a new mutation `catch_pokemon` using `payload` macro.
  # Make it accept `nest_token` (of type `non_null(string)`)
  # and return a single field `pokemon` of type `pokemon`.
  # Use `TrainershipResolver.catch_pokemon/2` as the resolve function.
  # Docs:
  # * https://hexdocs.pm/absinthe_relay/Absinthe.Relay.Mutation.Notation.Modern.html
  # * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#non_null/1
end
