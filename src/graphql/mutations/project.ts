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

export const MUTATION_UPDATE_PROJECT = gql`
  mutation MutationUpdateProject($id: ID!, $nameProject: String!) {
    updateProject(id: $id, data: { name: $nameProject }) {
      data {
        id
      }
    }
  }
`

export const MUTATION_UPDATE_PROJECT_BOARDS = gql`
  mutation MutationUpdateProjectBoards($id: ID!, $boardsIds: [ID]!) {
    updateProject(id: $id, data: { boards: $boardsIds }) {
      data {
        id
      }
    }
  }
`
