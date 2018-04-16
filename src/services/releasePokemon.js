// @flow

import type { Environment } from "relay-runtime";
import { commitMutation, graphql } from "react-relay";

import MutationError from "../services/MutationError";

const mutation = graphql`
  mutation releasePokemonMutation($input: ReleasePokemonInput!) {
    releasePokemon(input: $input) {
      event {
        id
        pokemon {
          releasedAt {
            iso8601
          }
          releaseComment
        }
      }
    }
  }
`;

const releasePokemon = (
  { pokemonId, comment }: { pokemonId: string, comment: string },
  environment: Environment,
): Promise<{ event: Object }> =>
  new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: {
        input: {
          pokemonId,
          comment,
        },
      },
      onCompleted: (response, errors) => {
        if (!errors) {
          resolve({ event: response.releasePokemon.event });
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

export { releasePokemon as default, MutationError };
