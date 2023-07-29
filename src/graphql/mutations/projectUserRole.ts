import { gql } from '@apollo/client'

export const MUTATION_DELETE_PROJECT_USER_ROLE = gql`
  mutation MutationDeleteProjectUserRole($id: ID!) {
    deleteProjectUserRole(id: $id) {
      data {
        id
      }
    }
  }
`
