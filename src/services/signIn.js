// @flow

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
