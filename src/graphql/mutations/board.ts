import { gql } from '@apollo/client'

export const MUTATION_DELETE_BOARD = gql`
  mutation MutationDeleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      data {
        id
      }
    }
  }
`
