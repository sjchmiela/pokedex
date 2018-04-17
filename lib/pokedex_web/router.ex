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

  scope "/" do
    pipe_through(:api)
    forward("/graphql", Absinthe.Plug, schema: PokedexWeb.Schema)
    forward("/graphiql", Absinthe.Plug.GraphiQL, schema: PokedexWeb.Schema)
  end

  scope "/", PokedexWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/*path", PageController, :index)
  end
end
