// @flow

// STEP 14
// Have a look on this file. This is a mutation wrapper. Though not required, it
// helps to keep the code organized.
// const mutation - mutation query
// const SignIn - function that takes input = {username, password} and Relay Environment
// and returns a promise that resolves to {token: token} or rejects with errors.
// Docs:
// * https://facebook.github.io/relay/docs/en/mutations.html#commitmutation
// * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

import type { Environment } from "relay-runtime";
import { commitMutation, graphql } from "react-relay";

import MutationError from "../services/MutationError";

const mutation = graphql`
  mutation signInMutation($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

const signIn = (
  { username, password }: { username: string, password: string },
  environment: Environment,
): Promise<{ token: string }> =>
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
          resolve({ token: response.login.token });
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

export { signIn as default, MutationError };
