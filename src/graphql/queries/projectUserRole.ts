import { gql } from '@apollo/client'

export const QUERY_PROJECT_USER_ROLES_LIGHT = gql`
  query QueryProjectUserRolesLight($email: String!) {
    projectUserRoles(filters: { user: { email: { eq: $email } } }) {
      data {
        id
      }
    }
  }
`

export const QUERY_PROJECT_USER_ROLES_FULL = gql`
  query QueryProjectUserRolesFull($email: String!) {
    projectUserRoles(filters: { user: { email: { eq: $email } } }) {
      data {
        id
        attributes {
          role
          project {
            data {
              id
              attributes {
                name
                projectUserRoles {
                  data {
                    attributes {
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
      }
    }
  }
`

export const QUERY_PROJECT_USER_ROLE_BY_USER_AND_PROJECT = gql`
  query QueryProjectUserRolesByUserAndProject($userId: ID!, $projectId: ID!) {
    projectUserRoles(
      filters: {
        user: { id: { eq: $userId } }
        project: { id: { eq: $projectId } }
      }
    ) {
      data {
        id
      }
    }
  }
`
