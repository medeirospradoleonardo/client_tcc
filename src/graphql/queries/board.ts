import { gql } from '@apollo/client'

export const QUERY_BOARD = gql`
  query QueryBoard($boardId: ID!) {
    board(id: $boardId) {
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
