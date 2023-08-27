import { gql } from '@apollo/client'

export const MUTATION_CREATE_SPRINT = gql`
  mutation MutationCreateSprint(
    $projectId: ID!
    $name: String!
    $initialDate: Date!
    $finalDate: Date!
  ) {
    createSprint(
      data: {
        project: $projectId
        name: $name
        initialDate: $initialDate
        finalDate: $finalDate
      }
    ) {
      data {
        id
        attributes {
          name
          initialDate
          finalDate
          expand
          boards {
            data {
              id
              attributes {
                title
                timeEstimated
                description
                author {
                  data {
                    id
                    attributes {
                      username
                    }
                  }
                }
                responsible {
                  data {
                    id
                    attributes {
                      username
                    }
                  }
                }
                status
              }
            }
          }
        }
      }
    }
  }
`
export const MUTATION_DELETE_SPRINT = gql`
  mutation MutationDeleteSprint($id: ID!) {
    deleteSprint(id: $id) {
      data {
        id
      }
    }
  }
`

export const MUTATION_UPDATE_SPRINT = gql`
  mutation MutationUpdateSprint(
    $id: ID!
    $name: String!
    $initialDate: Date!
    $finalDate: Date!
  ) {
    updateSprint(
      id: $id
      data: { name: $name, initialDate: $initialDate, finalDate: $finalDate }
    ) {
      data {
        id
        attributes {
          name
          initialDate
          finalDate
          expand
        }
      }
    }
  }
`

export const MUTATION_SPRINT_TOGGLE_EXPAND = gql`
  mutation MutationSprintToggleExpand($id: ID!, $expand: Boolean!) {
    updateSprint(id: $id, data: { expand: $expand }) {
      data {
        id
        attributes {
          name
          initialDate
          finalDate
          expand
        }
      }
    }
  }
`

export const MUTATION_UPDATE_BOARDS = gql`
  mutation MutationUpdateSprintBoards($id: ID!, $boardsIds: [ID]!) {
    updateSprint(id: $id, data: { boards: $boardsIds }) {
      data {
        id
        attributes {
          name
          initialDate
          finalDate
          expand
        }
      }
    }
  }
`
