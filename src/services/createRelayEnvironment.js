import { Environment, Network, RecordSource, Store } from "relay-runtime";

// STEP 11
// We have our backend prepared, now we need to instruct our frontend
// how to request the subscriptions from our server.
// For this we will use to NPM packages provided by Absinthe and Phoenix:
// @absinthe/socket, @absinthe/socket-relay and phoenix
// Let's install them your preferred way (yarn add <packages> or npm install <packages>).

// STEP 12
// Once we've downloaded all our dependencies, let's create an AbsintheSocket
// that we will be able to provide to @absinthe/socket-relay's createSubscriber,
// which we will add to the Network.create's arguments.
//
// Let's import * as AbsintheSocket from @absinthe/socket,
// only createSubscriber function from among exports of @absinthe/socket-relay
// and only Socket as PhoenixSocket from among exports of phoenix

export const tokenKey = "token";

const source = new RecordSource();
const store = new Store(source);
const fetchQueryFactory = (customHeaders = {}) => (operation, variables) =>
  fetch("/graphql", {
    method: "POST",
    headers: {
      ...customHeaders,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });

// STEP 13
// Create an instance of AbsintheSocket pointing to our server's socket URL
// See: https://github.com/absinthe-graphql/absinthe-socket/tree/master/packages/socket#create
// Ensure that the URL matches the WS URL you've used in GraphiQL.

export default token => {
  const customHeaders = token ? { Authorization: `Bearer ${token}` } : null;
  const network = Network.create(
    fetchQueryFactory(customHeaders),
    // STEP 14
    // Use the socket created in the previous step to
    // add a second argument to Network.create.
    // See example at https://github.com/absinthe-graphql/absinthe-socket/tree/master/packages/socket-relay#createsubscriber
  );
  return new Environment({ network, store });
};
