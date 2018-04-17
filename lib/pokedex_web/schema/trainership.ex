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

  interface :event do
    field(:id, non_null(:id))
    field(:at, :datetime)

    resolve_type(fn
      %{type: :released}, _ -> :event_released
      %{type: :caught}, _ -> :event_caught
      _, _ -> nil
    end)
  end

  connection(node_type: :event)

  object(:viewer) do
    field(:id, :id, resolve: fn _, _ -> {:ok, "viewer"} end)

    connection field(:events, node_type: :event) do
      resolve(&TrainershipResolver.list_events/2)
    end
  end

  node object(:event_caught, id_fetcher: fn event, _ -> event.pokemon.id end) do
    field(:at, :datetime) do
      resolve(fn event, _, _ -> {:ok, event.pokemon.inserted_at} end)
    end

    interface(:event)

    field(:pokemon, :pokemon) do
      resolve(fn event, _, _ -> {:ok, event.pokemon} end)
    end
  end

  node object(:event_released, id_fetcher: fn event, _ -> event.pokemon.id end) do
    field(:at, :datetime) do
      resolve(fn event, _, _ -> {:ok, event.pokemon.released_at} end)
    end

    interface(:event)

    field(:pokemon, :pokemon) do
      resolve(fn event, _, _ -> {:ok, event.pokemon} end)
    end

    field :comment, :string do
      resolve(fn event, _, _ -> {:ok, event.pokemon.release_comment} end)
    end
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

  # STEP 5
  # Just as we can split our query schema definitions across files,
  # we can do this with our subscriptions definitions.
  #
  # Firstly, we will create a :trainership_subscriptions object.
  #
  # A specific subscription type is defined with a field macro,
  # that should have at least a config "macro" (but it can have more than just that):
  # * config receives two arguments: arguments to the subscription document,
  #   and the whole info object. It should return {:ok, topic: <string>}
  #   if the subscription should be resolved. Topic is a string that identifies
  #   a given subscription connection. Here we will define one global topic,
  #   dismissing any arguments values, but if you would create a subscription
  #   for eg. chat conversation or some specific user's notifications feed,
  #   you would use topic identifier for that.
  # * trigger is a macro that tells Absinthe "this mutation should trigger
  #   sending a subscription update to all the subscribers on this topic".
  # * resolve is a macro that Absinthe uses to change the triggering object
  #   into a root of the subscription payload.
  #
  # With that in mind let's create an :events_feed subscription that will
  # return events (an object of type :event). No matter what the arguments will be,
  # the topic should be static (whatever you like, we've used "event_feed" with success).

  # STEP 7
  # Let's test our setup!
  # Ensure you have access to the running project's console
  # (typically you'd do this by running iex -S mix phx.server command).
  # Open up GraphiQL, ensure that it has a valid WS URL provided
  # (something like ws://localhost:4000/socket), the path depends
  # on the path of the socket defined at the top of PokedexWeb.Endpoint
  # and run a subscription document through the wire:
  # subscription {
  #   eventsFeed {
  #     id
  #       __typename
  #       at {
  #         iso8601
  #       }
  #     }
  #   }
  # }
  # You should see "Your subscription data will appear here after server publication!"
  # as a response. Let's do update some subscriptions!

  # STEP 8
  # Return to the project's console in terminal and run the following
  # (I'd encourage you to interpolate the <WHATEVER_TOPIC_YOUVE_SET> constant here.)
  #
  # > pokemon = Pokedex.Repo.all(Pokedex.Trainership.Pokemon) |> List.first
  # > event = %{type: :caught, pokemon: pokemon}
  # > Absinthe.Subscription.publish(PokedexWeb.Endpoint, event, events_feed: <WHATEVER_TOPIC_YOUVE_SET>)
  #
  # You should see new data content show up in the GraphiQL value pane.
  # If you'd like, you can change the document in the left GraphiQL pane,
  # rerun the query and publish update again (up arrow + enter in the console) should do it.
  # The right pane should show data resolved for a new document.

  # STEP 9
  # If you'd like, you could now put calls to Absinthe.Subscription.publish/3
  # in the TrainershipResolver and call it a day, however, Absinthe provides
  # a nicer way to implement triggering subscription updates.
  # Notice that most of the time (in our app this it's definietely the case),
  # events are triggered by mutations (in other apps they could probably be issued
  # by some third-party API calls, scheduled jobs, etc). Absinthe provides
  # a semantic way to define this connection between mutations and subscriptions.
  #
  # Remember from the subscription definition?
  #
  # * trigger is a macro that tells Absinthe "this mutation should trigger
  #   sending a subscription update to all the subscribers on this topic".
  #
  # We can use this macro to instruct Absinthe to also trigger our subscription
  # when a mutation happens. In fact, two mutations trigger one subscription
  # in our application: :catch_pokemon and :release_pokemon. Both of these mutations
  # should update our subscription (in fact any subscription on the static topic
  # we've defined earlier).
  #
  # Use the trigger macro to instruct Absinthe to send an update to our subscriptions
  # when either :catch_pokemon or :release_pokemon mutation happens.
  # Remember that trigger should receive two arguments, the former is the name
  # of the mutation, the latter is a keyword list which should contain a topic key
  # and a function value, receiving one argument (the mutation's value),
  # returning updated topic identifier.
  #
  # If you would run the mutation now, the subscription wouldn't work exactly work
  # — the subscription update would come empty. This is because the mutation's return value
  # and the one expected by our subscriptions don't match (mutation returns a map
  # with the event under :event, and subscriptions expects an event).

  # STEP 10
  # To make mutations and our subscription match, we need to provide Absinthe
  # with a way to process the mutations' return values and make it a proper root value
  # of the subscription. That's where resolve macro comes in.
  #
  # resolve macro receives a function with three arguments:
  # 1. mutation's return value
  # 2. arguments map
  # 3. info map
  #
  # Write a resolve macro with a function that will receive
  # a value matching mutations' return value and return an event.
  #
  # Reload the GraphiQL webpage. Rerun the subscription document
  # and run a catchPokemon mutation in a separate GraphiQL tab.
  # You should see subscription update in the original GraphiQL tab.
end
