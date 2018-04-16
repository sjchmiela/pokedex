# STEP 9
# We want to know which user is calling the query in the resolvers, that's why we
# are creating a context with current_user.
# Users are authenticated by `Authorization` header containing `Bearer _token_from_mutation_`.
# Define a new module `PokedexWeb.Context`, which is a Plug.
# Based on https://hexdocs.pm/absinthe/context-and-authentication.html#context-and-plugs
# implement the context. With details not taken into account, the only part that needs to be changed is
# the `authorize` function. Use `Pokedex.Guardian.resource_from_token` to implement it.
# Docs:
# * https://hexdocs.pm/guardian/Guardian.html#resource_from_token/4
