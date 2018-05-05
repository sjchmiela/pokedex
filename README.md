# Pokédex 📕 — DIY [Elixir](https://elixir-lang.org) + [GraphQL](http://graphql.org) + [React](https://reactjs.org) + [Relay](http://facebook.github.io/relay/en/) workshop

## What is it?

This repository is a **Do It Yourself** workshop teaching you step-by-step the basics of implementing a GraphQL endpoint for your [Phoenix](http://phoenixframework.org) application with huge help of the [Absinthe](http://absinthe-graphql.org) Elixir library. Apart from that, part of the workshop covers the frontend work — you'll learn how to add Relay framework to your existing React application and use it to create highly interactive User Interfaces.

## How does it work?

The repository has 6 main branches:

* [firstQuery](https://github.com/sjchmiela/pokedex/tree/firstQuery) — given a simple Phoenix application, how to add GraphQL endpoint to it that will fetch some data from the database with Ecto and return as GraphQL response + how to render a list of Pokémons fetched from a GraphQL endpoint in React?
* [connections](https://github.com/sjchmiela/pokedex/tree/connections) — we already have a simple GraphQL endpoint, how to implement pagination with Absinthe and Relay?
* [authMutations](https://github.com/sjchmiela/pokedex/tree/authMutations) — ok, we know how to fetch data in several ways, let's execute some mutations (and obviously authorize the requests)
* [polymorphism](https://github.com/sjchmiela/pokedex/tree/polymorphism) — I've heard GraphQL supports interfaces and polymorphism of objects, how to implement this in Absinthe?
* [subscriptions](https://github.com/sjchmiela/pokedex/tree/subscriptions) — I'd like to make my UI react to real-time data sent by the backend. Here you'll learn how to push GraphQL-compatible updates to your clients with WebSockets magic
* [batching](https://github.com/sjchmiela/pokedex/tree/batching) — your application has so many users that you have to optimize requests sent to the database, the most obvious way will be to get rid of the N+1 issue and batch the requests

Each branch contains the Pokédex application in a working state and the codebase is sprinkled with comments `STEP <number>`. Just "search in all" for `STEP 1` on branch `firstQuery` to start the workshop, then for `STEP 2`, when you're finished with `firstQuery` checkout to `connections` search for `STEP 1` and so on.

**Before starting** you'll have to setup the development environment. You can either use the dockerized way, so:

```sh
docker-compose run phoenix mix deps.get
docker-compose run phoenix mix ecto.setup
docker-compose run phoenix yarn
docker-compose up
# Open localhost:4000 to see the application
```

or run the same commands on your `localhost` (but then remember you'll have to check whether DB config in `config/dev.exs` will work on your computer):

```sh
mix deps.get
mix ecto.setup
yarn
mix phx.server
# Open localhost:4000 to see the application
```

## Who did it?

This workshop has been created by two friends for a workshop session during ElixirConf EU 2018 (which BTW was a blast!)

<table style="text-align: center">
  <thead>
    <tr>
      <th width="45%" style="text-align: center">Stanisław Chmiela</th>
      <th width="45%" style="text-align: center">Łukasz Gurdek</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center">
        <a href="https://twitter.com/sjchmiela/">
          <img src="http://s3.amazonaws.com/erlang-conferences-production/media/files/000/000/753/thumbnail/1151041.jpg?1510051715" width="250" alt="Stanisław Chmiela" />
        </a>
      </td>
      <td style="text-align: center">
        <a href="https://github.com/ukasiu/">
          <img src="http://s3.amazonaws.com/erlang-conferences-production/media/files/000/000/757/thumbnail/lukasz_gurdek.png?1510053797" width="250" alt="Stanisław Chmiela" />
        </a>
    </tr>
    <tr>
      <td>
        <img src="https://sjchmiela.github.io/pokedex/swmansion.png" height="34" />
      </td>
      <td>
        <img src="https://sjchmiela.github.io/pokedex/avsystem.png" height="34" />
      </td>
    </tr>
  </tbody>
</table>
