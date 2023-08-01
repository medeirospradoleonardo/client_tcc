import { gql } from '@apollo/client'

export const MUTATION_CREATE_PROJECT = gql`
  mutation MutationCreateProject($nameProject: String!) {
    createProject(data: { name: $nameProject }) {
      data {
        id
      }
    }
  }
`
