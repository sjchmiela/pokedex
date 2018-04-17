import { Environment, Network, RecordSource, Store } from "relay-runtime";

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

export default token => {
  const customHeaders = token ? { Authorization: `Bearer ${token}` } : null;
  const network = Network.create(fetchQueryFactory(customHeaders));
  return new Environment({ network, store });
};
