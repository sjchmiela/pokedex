# STEP 2
# Create an empty module `PokedexWeb.Schema` for our GraphQL schema.
# You will need to "use" Absinthe.Schema for PokedexWeb.Schema to implement required functions.

# STEP 6
# Write a query schema with one field `number_one` of type `integer` at root level,
# that always resolves to `1`.
# Note: resolve functions must return {:ok, value} or {:error, value}.
# Try to experiment with both options in the next step.
# Hint: In the query you may use `numberOne` as well as `number_one`.
# Docs:
# * https://hexdocs.pm/absinthe/our-first-query.html
# * https://hexdocs.pm/absinthe/schemas.html
# * https://hexdocs.pm/absinthe/Absinthe.Schema.html
# * https://hexdocs.pm/absinthe/Absinthe.Schema.html#query/2
# * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#field/2
# * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#resolve/1

# STEP 7
# Go to /graphiql and try to fetch a value for newly created field `one`.
# Hint: You can start GraphQL query with either `query {` or just `{`.
# After you write the beginning you can use (Alt/Cmd/Ctrl)+Space (depending on the browser).
# Docs:
# https://graphql.org/learn/

# STEP 8
# Define object type `species`. Add fields for all the attributes
# with correspoding types with no resolver (which means default resolver will be used).
# Docs:
# * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#object/3
#
# Note that species also defines an ID field. Do not forget to add
# the :id field of type :id. Species will be an object type and GraphQL expects
# objects to implement the ID field.

# STEP 10
# Add new root level field `species_array`, which is of type: list of species.
# Use the resolve function defined in the previous step.
# Try to query the new field in GraphiQL (after refreshing). Note you have to create a subquery for species fields.
# Docs:
# * https://hexdocs.pm/absinthe/Absinthe.Schema.Notation.html#list_of/1

# STEP 11
# Exercise
# Add a new field `name` to species. It should return capitalized slug.
# If in doubt, take a second look at resolve function arguments.
