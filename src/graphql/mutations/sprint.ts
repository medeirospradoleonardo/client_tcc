import { gql } from '@apollo/client'

export const MUTATION_CREATE_SPRINT = gql`
  mutation MutationCreateSprint(
    $projectId: ID!
    $name: String!
    $initialDate: Date!
    $finalDate: Date!
  ) {
    createSprint(
      data: {
        project: $projectId
        name: $name
        initialDate: $initialDate
        finalDate: $finalDate
      }
    ) {
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
export const MUTATION_DELETE_SPRINT = gql`
  mutation MutationDeleteSprint($id: ID!) {
    deleteSprint(id: $id) {
      data {
        id
      }
    }
  }
`
