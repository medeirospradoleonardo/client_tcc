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

export const MUTATION_CREATE_BOARD = gql`
  mutation MutationCreateBoard(
    $title: String!
    $description: String!
    $timeEstimated: Int!
    $status: ENUM_BOARD_STATUS!
    $sprintId: ID
    $authorId: ID!
    $responsibleId: ID!
    $projectId: ID!
  ) {
    createBoard(
      data: {
        title: $title
        description: $description
        timeEstimated: $timeEstimated
        status: $status
        sprint: $sprintId
        author: $authorId
        responsible: $responsibleId
        project: $projectId
      }
    ) {
      data {
        id
        attributes {
          createdAt
          conclusionDate
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
          sprint {
            data {
              id
            }
          }
          status
        }
      }
    }
  }
`

export const MUTATION_UPDATE_BOARD = gql`
  mutation MutationUpdateBoard(
    $boardId: ID!
    $title: String!
    $description: String!
    $timeEstimated: Int!
    $status: ENUM_BOARD_STATUS!
    $sprintId: ID
    $authorId: ID!
    $responsibleId: ID!
    $projectId: ID!
  ) {
    updateBoard(
      id: $boardId
      data: {
        title: $title
        description: $description
        timeEstimated: $timeEstimated
        status: $status
        sprint: $sprintId
        author: $authorId
        responsible: $responsibleId
        project: $projectId
      }
    ) {
      data {
        id
        attributes {
          createdAt
          conclusionDate
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
          sprint {
            data {
              id
            }
          }
          status
        }
      }
    }
  }
`
