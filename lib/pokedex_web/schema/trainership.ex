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

  # STEP 1
  # Let's define an :event interface.
  # We can surely see that events share pretty many of the properties:
  # * id: id
  # * at: datetime
  # * pokemon: pokemon
  #
  # Once we notice that we have to think about what our event
  # interface will encapsulate. In our opinion an :event interface
  # should be an abstraction over a generic event that happened in our application,
  # like catching or releasing a Pokemon or maybe a new friendship connection,
  # or maybe a new user registration.
  #
  # With that said, I hope we can say that it's fairly obvious what
  # fields should the interface contain.
  #
  # Define an :event interface encapsulating common fields.
  #
  # For interface/3 reference, go to
  # https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#interface/3

  # STEP 4
  # If you would go on and try to run Phoenix server now, you would get a very nice error
  # You can try it if you want. What it complains about is that the `interface :event`
  # does not implement :resolve_type function (you could also provide :is_type_of function
  # on each of the implementing types, but we consider :resolve_type a better practice.)
  #
  # Let's appease Absinthe by providing a :resolve_type function!
  # Remember that you can easily infer of what type is the event
  # by checking the event.type property, which will be either
  # equal to :caught or :released.
  #
  # For inspiration, go to
  # https://hexdocs.pm/absinthe/Absinthe.Type.Interface.html

  # STEP 5
  # Open up GraphiQL and it's Docs section. Search schema for
  # Event type. Among the search results you should see a single
  # Event entry. If you click on it, you should see our interface
  # nicely defined and visible. After a list of fields you should see
  # a list of implementing types. If you click on one of them,
  # you will see at the top of the details that it implements
  # Event and Node. We just programmed the Event interface,
  # and the Node interfaces is implemented by the node macro
  # prepending the object definition (it provides the id: ID! field).

  node object(:event_caught, id_fetcher: fn event, _ -> event.pokemon.id end) do
    field(:at, :datetime) do
      resolve(fn event, _, _ -> {:ok, event.pokemon.inserted_at} end)
    end

    # STEP 3
    # With an interface defined, we can go on and inform
    # Absinthe that certain object types implement our :event interface.
    #
    # For that we would use interface/1
    # https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#interface/1

    field(:pokemon, :pokemon) do
      resolve(fn event, _, _ -> {:ok, event.pokemon} end)
    end
  end

  connection(node_type: :event_caught)

  node object(:event_released, id_fetcher: fn event, _ -> event.pokemon.id end) do
    field :comment, :string do
      resolve(fn event, _, _ -> {:ok, event.pokemon.release_comment} end)
    end

    field(:at, :datetime) do
      resolve(fn event, _, _ -> {:ok, event.pokemon.released_at} end)
    end

    # STEP 3
    # I think definition of this object type also requires a little upgrade.

    field(:pokemon, :pokemon) do
      resolve(fn event, _, _ -> {:ok, event.pokemon} end)
    end
  end

  connection(node_type: :event_released)

  # STEP 6
  # Ok, we have our interface defined and both event types
  # implement it. Let's fix that connection thingy.
  #
  # First, we need to define the connection type
  # with the connection macro, just as if we would do
  # with a "normal" type.
  #
  # For inspiration... look above!

  object(:viewer) do
    field(:id, :id, resolve: fn _, _ -> {:ok, "viewer"} end)

    connection field(:caught_events, node_type: :event_caught) do
      resolve(&TrainershipResolver.list_caught_events/2)
    end

    connection field(:release_events, node_type: :event_released) do
      resolve(&TrainershipResolver.list_released_events/2)
    end

    # STEP 7
    # With the connection type defined, let's add the field to the viewer
    # type! Define a connection field just like above (name it well, eg. :events).
    # Point the resolve to a new function, name it however you like
    # (we tried list_events/2, it worked pretty well).
  end

  object :trainership do
    field(:viewer, :viewer, resolve: fn _, _ -> {:ok, %{}} end)
  end

  object :trainership_mutations do
    payload field(:catch_pokemon) do
      input do
        field(:nest_token, non_null(:string))
      end

      output do
        field(:event, :event_caught)
      end

      resolve(&TrainershipResolver.catch_pokemon/2)
    end

    payload field(:release_pokemon) do
      input do
        field(:pokemon_id, non_null(:id))
        field(:comment, non_null(:string))
      end

      output do
        field(:event, :event_released)
      end

      middleware(Absinthe.Relay.Node.ParseIDs, pokemon_id: :pokemon)

      resolve(&TrainershipResolver.release_pokemon/2)
    end
  end
end
