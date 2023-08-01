import { gql } from '@apollo/client'

export const QUERY_PROJECT = gql`
  query QueryProject($id: ID!) {
    project(id: $id) {
      data {
        id
        attributes {
          name
          projectUserRoles {
            data {
              id
              attributes {
                role
                user {
                  data {
                    id
                    attributes {
                      username
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
