import { gql } from '@apollo/client'

export const QUERY_PROJECT_USER_ROLES = gql`
  query QueryProjectUserRoles($email: String!) {
    projectUserRoles(filters: { user: { email: { eq: $email } } }) {
      data {
        attributes {
          role
          project {
            data {
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
