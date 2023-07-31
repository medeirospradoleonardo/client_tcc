import { gql } from '@apollo/client'

export const QUERY_PROFILE_ME = gql`
  query QueryProfileMe($identifier: ID!) {
    usersPermissionsUser(id: $identifier) {
      data {
        id
        attributes {
          email
          username
          activeProject {
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

export const QUERY_ALL_USERS = gql`
  query QueryAllUsers {
    usersPermissionsUsers(filters: { type: { eqi: "default" } }) {
      data {
        id
        attributes {
          username
        }
      }
    }
  }
`
