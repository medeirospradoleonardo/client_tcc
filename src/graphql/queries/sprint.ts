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
