# First query

So you would like to implement GraphQL in an existing Phoenix application, huh?

No problem! This guide will lead you through the process. Just search for "STEP"
in all the files and follow the order.

## Spoilers

<details>
  <summary>Step 1</summary>

```elixir
{:absinthe_relay, "~> 1.4"},
{:absinthe, "~> 1.4"},
```

</details>

<details>
  <summary>Step 2</summary>

```elixir
defmodule PokedexWeb.Schema do
  use Absinthe.Schema
end
```

</details>

<details>
  <summary>Step 4</summary>

```elixir
plug(
  Plug.Parsers,
  parsers: [:urlencoded, :multipart, :json],
  pass: ["*/*"],
  json_decoder: Jason
)
```

</details>

<details>
  <summary>Step 5</summary>

```elixir
scope "/" do
  pipe_through(:api)

  forward(
    "/graphiql",
    Absinthe.Plug.GraphiQL,
    schema: PokedexWeb.Schema
  )

  forward("/graphql", Absinthe.Plug, schema: PokedexWeb.Schema)
end
```

</details>

<details>
  <summary>Step 6</summary>

```elixir
query do
  field :number_one, :integer do
    resolve fn _, _, _ -> {:ok, 1} end
  end
end
```

</details>

<details>
  <summary>Step 7</summary>

```graphql
query {
  numberOne
}
```

</details>

<details>
  <summary>Step 8</summary>

```elixir
object :species do
  field :id, :integer
  field :slug, :string
  field :image_url, :string
  field :max_height, :integer
  field :max_weight, :integer
  field :min_height, :integer
  field :min_weight, :integer
end
```

</details>

<details>
  <summary>Step 9</summary>

```elixir
defmodule PokedexWeb.Resolvers.PokemonsResolver do
  alias Pokedex.{Repo, Pokemons}
  alias Pokemons.{Species}

  def list_species(_, _) do
    species =
      Species
      |> Repo.all()

    {:ok, species}
  end
end
```

</details>

<details>
  <summary>Step 10</summary>

```elixir
query do
  field :number_one, :integer do
    resolve fn _, _, _ -> {:ok, 1} end
  end

  field :species_array, list_of(:species) do
    resolve(&PokedexWeb.Resolvers.PokemonsResolver.list_species/2)
  end
end
```

```graphql
query {
  speciesArray {
    slug
  }
}
```

</details>

<details>
  <summary>Step 11</summary>

```elixir
object :species do
  # ...
  field :name, :string do
    resolve fn species, _, _ -> {:ok, String.capitalize(species.slug)} end
  end
  # ...
end
```

</details>

<details>
  <summary>Step 12</summary>

```javascript
import { graphql, createFragmentContainer } from "react-relay";
```

</details>

<details>
  <summary>Step 13</summary>

```javascript
class SpeciesList extends React.Component<PropsType> {
  // ...
```

</details>

<details>
  <summary>Step 14</summary>

```graphql
{
  speciesArray {
    ...SpeciesList_species
  }
}
fragment SpeciesList_species on Species {
  name
}
```

</details>

<details>
  <summary>Step 15</summary>

```javascript
export default createFragmentContainer(SpeciesList, {
  species: graphql`
    fragment SpeciesList_species on Species @relay(plural: true) {
      id
      name
      imageUrl
    }
  `,
});
```

</details>

<details>
  <summary>Step 16</summary>

```javascript
import { graphql, QueryRenderer } from "react-relay";
// If using Flow:
// import type { ReadyState } from "react-relay";

import createRelayEnvironment from "../services/createRelayEnvironment";
```

</details>

<details>
  <summary>Step 17</summary>

```javascript
const environment = createRelayEnvironment();
```

</details>

<details>
  <summary>Step 19</summary>

```javascript
const ConnectedSpeciesList = props => (
  <QueryRenderer
    {...props}
    query={graphql`
      query ApplicationDrawerQuery {
        speciesArray {
          ...SpeciesList_species
        }
      }
    `}
    variables={{}}
    environment={environment}
    render={(readyState: ReadyState): React.Element<*> => {
      if (!readyState.props) {
        return null;
      }
      const { speciesArray } = readyState.props;
      return <SpeciesList {...props} species={speciesArray} />;
    }}
  />
);
```

</details>

<details>
  <summary>Step 20</summary>

```javascript
<ConnectedSpeciesList searchTerm={this.state.speciesListSearchTerm} />
```

</details>

<details>
  <summary>Step 21</summary>

```javascript
const ConnectedSpeciesList = props => (
  <QueryRenderer
    {...props}
    query={graphql`
      query ApplicationDrawerQuery {
        speciesArray {
          ...SpeciesList_species
        }
      }
    `}
    variables={{}}
    environment={environment}
    render={(readyState: ReadyState): React.Element<*> => {
      if (readyState.error) {
        return <p>Error</p>;
      }
      if (!readyState.props) {
        return <p>Loading</p>;
      }
      const { speciesArray } = readyState.props;
      return <SpeciesList {...props} species={speciesArray} />;
    }}
  />
);
```

</details>
