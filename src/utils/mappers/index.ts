import { QueryProjectUserRoles_projectUserRoles_data } from 'graphql/generated/QueryProjectUserRoles'

export const projectsMapper = (
  projectUserRoles: QueryProjectUserRoles_projectUserRoles_data[]
) => {
  return projectUserRoles.map((projectUserRole) => ({
    role: projectUserRole.attributes?.role,
    nameProject: projectUserRole.attributes?.project?.data?.attributes?.name
  }))
}
