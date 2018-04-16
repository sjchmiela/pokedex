# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :pokedex, ecto_repos: [Pokedex.Repo]

config :phoenix, :format_encoders, json: Jason

# Configures the endpoint
config :pokedex, PokedexWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "WdF6voTaxjXqrh70VjQEhJUo26poGULJo64SHt76b6ORe9+/HvXew3euTOXLibMs",
  render_errors: [view: PokedexWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Pokedex.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# STEP 3
# Add config for Absinthe that defines schema, so that we can use `mix absinthe.schema.json`
# without schema argument. Also choose `Jason` as the json codec (it's faster than `Poison`).
# `config :absinthe, schema: PokedexWeb.Schema, json_codec: Jason`
# (we leave that line in its final form, as we haven't found any docs for this config)

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
