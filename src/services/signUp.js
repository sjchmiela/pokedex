// @flow

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
