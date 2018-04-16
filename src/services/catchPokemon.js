// @flow

import type { Environment } from "relay-runtime";
import { commitMutation, graphql } from "react-relay";

import MutationError from "../services/MutationError";

const mutation = graphql`
  mutation catchPokemonMutation($input: CatchPokemonInput!) {
    catchPokemon(input: $input) {
      event {
        pokemon {
          species {
            name
          }
        }
      }
    }
  }
`;

const catchPokemon = (
  { nestToken }: { nestToken: string },
  environment: Environment,
): Promise<{ event: Object }> =>
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
          resolve({ event: response.catchPokemon.event });
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
