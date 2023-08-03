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

export const MUTATION_DELETE_PROJECT = gql`
  mutation MutationDeleteProject($id: ID!) {
    deleteProject(id: $id) {
      data {
        id
      }
    }
  }
`
