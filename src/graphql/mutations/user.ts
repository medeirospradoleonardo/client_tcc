import { gql } from '@apollo/client'

export const MUTATION_ACTIVE_PROJECT = gql`
  mutation MutationActiveProject($idProject: ID!, $idUser: ID!) {
    updateUsersPermissionsUser(
      id: $idUser
      data: { activeProject: $idProject }
    ) {
      data {
        attributes {
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
