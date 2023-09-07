import { gql } from '@apollo/client'

export const QUERY_SPRINTS = gql`
  query QuerySprints($projectId: ID!) {
    sprints(filters: { project: { id: { eq: $projectId } } }) {
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
`

export const QUERY_SPRINT = gql`
  query QuerySprint($id: ID!) {
    sprint(id: $id) {
      data {
        id
        attributes {
          name
          initialDate
          finalDate
        }
      }
    }
  }
`

export const QUERY_SPRINTS_IN_PROJECT = gql`
  query QuerySprintsInProject($projectId: ID!) {
    sprints(filters: { project: { id: { eq: $projectId } } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`

export const QUERY_SPRINT_BOARDS = gql`
  query QuerySprintBoards($id: ID!) {
    sprint(id: $id) {
      data {
        id
        attributes {
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
`
