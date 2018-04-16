defmodule PokedexWeb.Router do
  use PokedexWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  # STEP 5
  # Please use the below commented stub to route
  # * /graphql requests to `Absinthe.Plug`
  # * /graphiql requests to `Absinthe.Plug.GraphiQL`.
  # Remember to add `schema: PokedexWeb.Schema` option to each of the routes
  # and remove the `/api` scope and remove HelloWeb alias from the scope definition.
  # Also move the new scope before the "catch-all" scope.
  # Docs:
  # * https://hexdocs.pm/absinthe/plug-phoenix.html#phoenix - please note that we are interested in a particular route scenario
  # * https://hexdocs.pm/absinthe_plug/Absinthe.Plug.GraphiQL.html
  # * https://hexdocs.pm/phoenix/Phoenix.Router.html#scope/2
  # * https://hexdocs.pm/phoenix/Phoenix.Router.html#forward/4

  # Other scopes may use custom stacks.
  # scope "/api", HelloWeb do
  #   pipe_through :api
  # end

  scope "/", PokedexWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/*path", PageController, :index)
  end
end
