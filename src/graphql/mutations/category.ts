import { gql } from '@apollo/client'

export const MUTATION_CREATE_CATEGORY = gql`
  mutation MutationCreateCategory($name: String!) {
    createCategory(data: { name: $name }) {
      data {
        id
      }
    }
  }
`
