defmodule PokedexWeb.PageController do
  use PokedexWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
