import { gql } from '@apollo/client'

export const MUTATION_CREATE_ACTIVE_SPRINT = gql`
  mutation MutationCreateActiveSprint(
    $projectId: ID!
    $sprintId: ID!
    $userId: ID!
  ) {
    createActiveSprint(
      data: { project: $projectId, sprint: $sprintId, user: $userId }
    ) {
      data {
        id
        attributes {
          sprint {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`

export const MUTATION_UPDATE_ACTIVE_SPRINT = gql`
  mutation MutationUpdateActiveSprint($activeSprintId: ID!, $sprintId: ID!) {
    updateActiveSprint(id: $activeSprintId, data: { sprint: $sprintId }) {
      data {
        id
        attributes {
          sprint {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`
