# Connections

## Motivation

There is a problem with our `speciesArray` query. Notice how few Pokemon species does the user see
compared to how many we have to fetch -- on a regular laptop screen I can see 9 species without scrolling,
while the frontend downloaded all 100 species along with their images. I use less than 10% of the data
I had to download. And we only added 100 Pokemon species to the database, whereas there are currently [807 Pokemon species known](https://en.wikipedia.org/wiki/List_of_Pokémon#cite_ref-Pokédex_31-0).

Fortunately, there is a way to fix this and download just a little bit more than the user probably needs.

## Solution

That's where Connections and [Pagination](http://graphql.org/learn/pagination/) really shine.

GraphQL connections give us a way to instead of querying like this:

```graphql
query {
  speciesArray {
    id
    name
    imageUrl
  }
}
```

query like this:

```graphql
query {
  species(first: 10) {
    edges {
      node {
        id
        name
        imageUrl
      }
    }
  }
}
```

As you probably guessed, this query would return only first 10 species from the list.

Follow the STEPs to learn how to implement pagination with Absinthe and Relay.

## Spoilers

<details>
  <summary>Step 1</summary>

```elixir
{:absinthe_relay, "~> 1.4"},
```

</details>

<details>
  <summary>Step 2</summary>

```elixir
use Absinthe.Relay.Schema, :modern
```

</details>

<details>
  <summary>Step 3</summary>

```elixir
connection(node_type: :species)
```

</details>

<details>
  <summary>Step 4</summary>

```elixir
connection field :species, node_type: :species do
  resolve(fn args, _ ->
    {:ok, pokemons} = PokemonsResolver.list_species()
    Absinthe.Relay.Connection.from_list(pokemons, args)
  end)
end
```

</details>

<details>
  <summary>Step 7</summary>

```elixir
def paginate_species(args, _) do
  Species
  |> order_by(:id)
  |> Absinthe.Relay.Connection.from_query(&Repo.all/1, args)
end
```

</details>

<details>
  <summary>Step 9</summary>

```elixir
node interface do
  resolve_type fn
    %Pokedex.Pokemons.Species{}, _ ->
      :species
    _, _ ->
      nil
  end
end
```

</details>

<details>
  <summary>Step 10</summary>

```elixir
node object :species do
  field(:slug, :string)
  field(:name, :string, resolve: &PokemonsResolver.species_name/3)
  field(:image_url, :string)
  field(:min_height, :integer)
  field(:max_height, :integer)
  field(:min_weight, :integer)
  field(:max_weight, :integer)
end
```

</details>

<details>
  <summary>Step 11</summary>

```elixir
node field do
  resolve fn
    %{type: :species, id: id}, _ ->
      {:ok, Pokedex.Repo.get!(Pokedex.Pokemons.Species, id)}
  end
end
```

</details>

<details>
  <summary>Step 13</summary>

```javascript
const ConnectedSpeciesList = props => (
  <QueryRenderer
    {...props}
    variables={{}}
    environment={environment}
    query={graphql`
      query ApplicationDrawerQuery {
        species(first: 15) {
          edges {
            node {
              ...SpeciesList_species
            }
          }
        }
      }
    `}
    render={(readyState: ReadyState) => {
      if (readyState.error) {
        return <p>Error</p>;
      }
      if (!readyState.props) {
        return <p>Loading</p>;
      }

      const species = readyState.props.species.edges.map(edge => edge.node);

      return <SpeciesList {...props} species={species} />;
    }}
  />
);
```

</details>

<details>
  <summary>Step 14</summary>

```javascript
import ConnectionSpeciesList from "../organisms/ConnectionSpeciesList";
```

</details>

<details>
  <summary>Step 15</summary>

```graphql
query ApplicationDrawerQuery {
  ...ConnectionSpeciesList_query
}
```

```javascript
return <ConnectionSpeciesList {...props} query={readyState.props} />;
```

</details>

<details>
  <summary>Step 25</summary>

```elixir
arg :search_term, :string
```

</details>

<details>
  <summary>Step 26</summary>

```elixir
def paginate_species(%{search_term: term} = args, _) when is_nil(term) == false do
  prepared_term = term |> String.downcase |> String.replace("%", "\\%")

  # This runs the `where` clause even when the term == "",
  # but as premature optimization is the root of all evil,
  # I'll leave it like this.
  Species
  |> order_by(:id)
  |> where([s], like(s.slug, ^"%#{prepared_term}%"))
  |> Absinthe.Relay.Connection.from_query(&Repo.all/1, args)
end
```

</details>

<details>
  <summary>Step 27</summary>

```graphql
@argumentDefinitions(
  count: { type: "Int", defaultValue: 20 }
  cursor: { type: "String" }
  searchTerm: { type: "String" }
)
```

</details>

<details>
  <summary>Step 28</summary>

```graphql
species(
  first: $count
  after: $cursor
  searchTerm: $searchTerm
)
```

</details>

<details>
  <summary>Step 29</summary>

```graphql
query ApplicationDrawerQuery($searchTerm: String) {
  # ...
}
```

</details>

<details>
  <summary>Step 30</summary>

```graphql
query ApplicationDrawerQuery($searchTerm: String) {
  ...ConnectionSpeciesList_query @arguments(searchTerm: $searchTerm)
}
```

</details>

<details>
  <summary>Step 31</summary>

```javascript
<QueryRenderer
  // ...
  variables={{ searchTerm: props.searchTerm }}
  // ...
/>
```

</details>

<details>
  <summary>Step 32</summary>

```javascript
{
  getVariables: (props, { count, cursor }) => ({
    count,
    cursor,
    searchTerm: props.searchTerm,
  }),
}
```

</details>

<details>
  <summary>Step 33</summary>

```graphql
query ConnectionSpeciesListPaginationQuery(
  $count: Int!
  $cursor: String
  $searchTerm: String
) {
  # ...
}
```

</details>

<details>
  <summary>Step 34</summary>

```graphql
...ConnectionSpeciesList_query @arguments(count: $count, cursor: $cursor, searchTerm: $searchTerm)
```

</details>
