import { gql } from '@apollo/client'

export const QUERY_PROFILE_ME = gql`
  query QueryProfileMe($identifier: ID!) {
    usersPermissionsUser(id: $identifier) {
      data {
        id
        attributes {
          email
          username
          type
          activeProject {
            data {
              id
              attributes {
                name
              }
            }
          }
          activeSprints {
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
                project {
                  data {
                    id
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

export const QUERY_PROFILE_ME_BOARDS = gql`
  query QueryProfileMeBoards($identifier: ID!) {
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
                boards {
                  data {
                    id
                    attributes {
                      sprint {
                        data {
                          id
                        }
                      }
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
            }
          }
        }
      }
    }
  }
`

export const QUERY_ALL_USERS = gql`
  query QueryAllUsers($IdUser: ID) {
    usersPermissionsUsers(
      filters: { type: { eqi: "default" }, id: { not: { eq: $IdUser } } }
    ) {
      data {
        id
        attributes {
          username
          type
        }
      }
    }
  }
`

export const QUERY_ALL_USERS_IN_PROJECT = gql`
  query QueryAllUsersInProject($projectId: ID!) {
    usersPermissionsUsers(
      filters: {
        type: { eqi: "default" }
        projectUserRoles: { project: { id: { eq: $projectId } } }
      }
    ) {
      data {
        id
        attributes {
          username
          type
        }
      }
    }
  }
`
