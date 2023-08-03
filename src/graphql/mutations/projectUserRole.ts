import { gql } from '@apollo/client'

export const MUTATION_DELETE_PROJECT_USER_ROLE = gql`
  mutation MutationDeleteProjectUserRole($id: ID!) {
    deleteProjectUserRole(id: $id) {
      data {
        id
      }
    }
  }
`

export const MUTATION_CREATE_PROJECT_USER_ROLE = gql`
  mutation MutationCreateProjectUserRoles(
    $role: ENUM_PROJECTUSERROLE_ROLE!
    $userId: ID!
    $projectId: ID!
  ) {
    createProjectUserRole(
      data: { role: $role, user: $userId, project: $projectId }
    ) {
      data {
        id
      }
    }
  }
`
