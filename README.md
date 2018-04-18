# Pokedex

## Usage

### Dockerized way (recommended)

```sh
docker-compose run pheonix mix deps.get
docker-compose run pheonix yarn
docker-compose up
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

### Local

* Install dependencies with `mix deps.get` and `yarn`
* Create and migrate your database with `mix ecto.setup`
* Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
