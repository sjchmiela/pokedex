# Mutations and authentication

So you would like to add mutations and authentication to your app, huh?

No problem! This guide will lead you through the process. Just search for "STEP" in all the files and follow the order.

## Spoilers

<details>
<summary>Step 1</summary>

```elixir
  mutation do
    import_fields(:accounts_mutations)
  end
```

</details>

<details>
<summary>Step 2</summary>

```elixir
  object :accounts_mutations do
  end
```

</details>

<details>
<summary>Step 3</summary>

```elixir
    payload field(:register) do
      input do
        field(:username, non_null(:string))
        field(:password, non_null(:string))
      end

      output do
        field(:user, :user)
      end

      resolve(&AccountsResolver.create_user/2)
    end
```

</details>

<details>
<summary>Step 4</summary>

```elixir
  import PokedexWeb.Resolvers.Helpers

  def create_user(args, _) do
    case Pokedex.Trainership.create_trainer(args) do
      {:ok, user} ->
        {:ok, %{user: user}}

      {:error, errors} ->
        {:error, errors |> process_errors}
    end
  end
```

</details>

<details>
<summary>Step 5</summary>

```graphql
mutation {
  register(input: { username: "testUser", password: "test1234" }) {
    user {
      id
      username
    }
  }
}
```

</details>

<details>
<summary>Step 6</summary>

```elixir
    payload field(:login) do
      input do
        field(:username, non_null(:string))
        field(:password, non_null(:string))
      end

      output do
        field(:user, :user)
        field(:token, non_null(:string))
      end

      resolve(&AccountsResolver.login_user/2)
    end
```

</details>

<details>
<summary>Step 7</summary>

```elixir
  def login_user(%{username: username, password: password}, _) do
    with user <- Accounts.get_user_by_username(username),
        {:ok, user} <- Comeonin.Bcrypt.check_pass(user, password),
        {:ok, token, _} <- Pokedex.Guardian.encode_and_sign(user) do
      {:ok, %{user: user, token: token}}
    else
      _ -> {:error, "Invalid credentials provided"}
    end
  end
```

</details>

<details>
<summary>Step 8</summary>

```graphql
mutation {
  login(input: { username: "testUser", password: "test1234" }) {
    token
  }
}
```

</details>

<details>
<summary>Step 9</summary>

```elixir
defmodule PokedexWeb.Context do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, current_user} <- authorize(token) do
      %{current_user: current_user}
    else
      _ -> %{}
    end
  end

  defp authorize(token) do
    Pokedex.Guardian.resource_from_token(token)
    |> case do
      {:ok, user, _} -> {:ok, user}
      {:error, reason} -> {:error, reason}
      _ -> {:error, "invalid authorization token"}
    end
  end
end
```

</details>

<details>
<summary>Step 10</summary>

```elixir
    plug(PokedexWeb.Context)
```

</details>

<details>
<summary>Step 11</summary>

```elixir
    field :me, :user do
      resolve(&AccountsResolver.current_user/2)
    end
```

</details>

<details>
<summary>Step 12</summary>

```elixir
  def current_user(_, %{context: %{current_user: current_user}}) do
    {:ok, current_user}
  end

  def current_user(_, _) do
    {:ok, nil}
  end
```

</details>

<details>
<summary>Step 13</summary>

```graphql
{
  me {
    username
  }
}
```

</details>

<details>
<summary>Step 15</summary>

```javascript
import signIn from "../services/signIn";
```

</details>

<details>
<summary>Step 16</summary>

```javascript
signIn(
  {
    username: this.state.username,
    password: this.state.password,
  },
  this.props.environment,
)
  .then(this.handleSuccess)
  .catch(this.handleError);
```

</details>

<details>
<summary>Step 18</summary>

```javascript
import * as React from "react";
import { graphql } from "react-relay";
import { withRouter } from "react-router-dom";

import withRelayData from "../services/withRelayData";

export function enforceUnauthenticated(
  WrappedComponent: React.ComponentType<Object>,
) {
  class Unauthenticated extends React.PureComponent<Object> {
    componentDidMount() {
      this.maybeRedirect();
    }

    componentDidUpdate() {
      this.maybeRedirect();
    }

    maybeRedirect = () => this.props.me && this.props.history.push("/");

    render() {
      const { me, ...rest } = this.props;
      if (!me) {
        return <WrappedComponent {...rest} />;
      }

      return null;
    }
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  Unauthenticated.displayName = `Unauthenticated(${displayName})`;

  const UnauthenticatedWithRelayData = withRelayData(
    Unauthenticated,
    graphql`
      query enforceUnauthenticatedQuery {
        me {
          id
        }
      }
    `,
  );

  return withRouter(UnauthenticatedWithRelayData);
}
```

</details>

<details>
<summary>Step 19</summary>

```javascript
const query = graphql`
  query ApplicationDrawerQuery($searchTerm: String) {
    me {
      id
    }
    ...ConnectionSpeciesList_query @arguments(searchTerm: $searchTerm)
  }
`;
```

</details>

<details>
<summary>Step 20</summary>

```javascript
const ConnectedSignOutButton = withRelayData(
  (props: ApplicationDrawerQuery) =>
    props.me ? <SignOutButton {...props} /> : null,
  query,
  null,
  { renderLoading: false },
);
```

</details>

<details>
<summary>Step 21</summary>

```javascript
renderAppBar = (props: {
  className: string,
  menuIconClassName: string,
  onDrawerToggle: () => void,
}): React.Node => (
  <ApplicationBar {...props}>
    <Hidden xsDown>
      <SimpleButtons />
    </Hidden>
    <ConnectedSignOutButton onClick={() => this.props.setToken(null)} />
  </ApplicationBar>
);
```

</details>

<details>
<summary>Step 22</summary>

```javascript
import type { Environment } from "relay-runtime";
import { commitMutation, graphql } from "react-relay";

import MutationError from "../services/MutationError";

const mutation = graphql`
  mutation signUpMutation($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
      }
    }
  }
`;

const signUp = (
  {
    username,
    password,
  }: {
    username: string,
    password: string,
  },
  environment: Environment,
): Promise<void> =>
  new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: {
        input: {
          username,
          password,
        },
      },
      onCompleted: (response, errors) => {
        if (!errors) {
          resolve();
        } else {
          const customErrors: Array<Object> = errors;
          reject(new MutationError(customErrors));
        }
      },
      onError: error => {
        reject(error);
      },
    });
  });

export { signUp as default, MutationError };
```

</details>

<details>
<summary>Step 23</summary>

```javascript
import signUp from "../services/signUp";
```

</details>

<details>
<summary>Step 24</summary>

```javascript
signUp(
  {
    username: this.state.username,
    password: this.state.password,
  },
  this.props.environment,
)
  .then(this.handleSuccess)
  .catch(this.handleError);
```

</details>

<details>
<summary>Step 25</summary>

```javascript
export default withRelayData(
  HomePage,
  graphql`
    query HomePageQuery {
      me {
        trainer {
          id
          ...RecentlyCaughtPokemonsList_trainer
        }
      }
    }
  `,
);
```

</details>

<details>
<summary>Step 26</summary>

```javascript
import HomePageQuery from "./__generated__/HomePageQuery";

class HomePage extends React.Component<HomePageQuery> {
```

</details>

<details>
<summary>Step 27</summary>

```javascript
return (
  <Grid container justify="center">
    {this.renderRecentlyCaughtPokemonsList()}
  </Grid>
);
```

</details>

<details>
<summary>Step 28</summary>

```elixir
  import_fields(:trainership_mutations)
```

</details>

<details>
<summary>Step 29</summary>

```elixir
  object(:trainership_mutations) do
  end
```

</details>

<details>
<summary>Step 30</summary>

```elixir
    payload field(:catch_pokemon) do
      input do
        field(:nest_token, non_null(:string))
      end

      output do
        field(:pokemon, :pokemon)
      end

      resolve(&TrainershipResolver.catch_pokemon/2)
    end
```

</details>

<details>
<summary>Step 31</summary>

```elixir
  def catch_pokemon(%{nest_token: token}, %{context: %{current_user: %User{trainer: trainer}}})
      when is_nil(trainer) == false do
    with {:ok, nest} <- Pokedex.Pokemons.get_nest_by_token(token),
         {:ok, pokemon} <- Trainership.catch_pokemon_in_nest(trainer, nest) do
      {:ok, %{pokemon: pokemon}}
    else
      {:error, errors} -> {:error, process_errors(errors)}
    end
  end
```

</details>

<details>
<summary>Step 32</summary>

```graphql
mutation {
  catchPokemon(input: { nestToken: "7cfddb" }) {
    pokemon {
      id
    }
  }
}
```

</details>

<details>
<summary>Step 33</summary>

```javascript
import type { Environment } from "relay-runtime";
import { commitMutation, graphql } from "react-relay";

import MutationError from "../services/MutationError";

const mutation = graphql`
  mutation catchPokemonMutation($input: CatchPokemonInput!) {
    catchPokemon(input: $input) {
      pokemon {
        species {
          name
        }
      }
    }
  }
`;

const catchPokemon = (
  { nestToken }: { nestToken: string },
  environment: Environment,
): Promise<{ pokemon: Object }> =>
  new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: {
        input: {
          nestToken,
        },
      },
      onCompleted: (response, errors) => {
        if (!errors) {
          resolve({ pokemon: response.catchPokemon.pokemon });
        } else {
          const customErrors: Array<Object> = errors;
          reject(new MutationError(customErrors));
        }
      },
      onError: error => {
        reject(error);
      },
    });
  });

export { catchPokemon as default, MutationError };
```

</details>

<details>
<summary>Step 34</summary>

```javascript
  { href: "/catch", icon: PokeballIcon, label: "Catch" },
```

</details>
