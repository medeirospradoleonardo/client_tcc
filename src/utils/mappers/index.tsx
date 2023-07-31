import { QueryProjectUserRolesFull_projectUserRoles_data } from 'graphql/generated/QueryProjectUserRolesFull'
import { ProjectUserRoleType } from 'templates/Projects'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { QueryAllUsers_usersPermissionsUsers_data } from 'graphql/generated/QueryAllUsers'

export const projectsMapper = (
  projectUserRoles: QueryProjectUserRolesFull_projectUserRoles_data[]
) => {
  return projectUserRoles.map((projectUserRole) => ({
    id: projectUserRole.id,
    role: projectUserRole.attributes?.role,
    project: {
      id: projectUserRole.attributes?.project?.data?.id,
      name: projectUserRole.attributes?.project?.data?.attributes?.name,
      users:
        projectUserRole.attributes?.project?.data?.attributes?.projectUserRoles?.data.map(
          (p) => ({
            id: p.attributes?.user?.data?.id,
            username: p.attributes?.user?.data?.attributes?.username
          })
        )
    }
  }))
}

function roleConverter(role: string) {
  switch (role) {
    case 'scrumMaster':
      return 'Scrum Master'
    case 'productOwner':
      return 'Product Owner'
    case 'member':
      return 'Membro'
  }
}

export const projectsToTableMapper = (
  projectUserRoles: ProjectUserRoleType[],
  editFunction: (id: string) => void,
  removeFunction: (id: string) => void,
  activeFunction: (id: string) => void,
  activeProjectId: string
) => {
  return projectUserRoles.map((projectUserRole) => ({
    name: projectUserRole.project.name,
    role: roleConverter(projectUserRole.role),
    active: projectUserRole.project.id == activeProjectId ? true : false,
    options: [
      <IconButton
        key={`edit${projectUserRole.id}`}
        size="small"
        disabled={projectUserRole.role == 'member' ? true : false}
        onClick={() => editFunction(projectUserRole.id)}
      >
        <EditIcon
          style={
            projectUserRole.role == 'member'
              ? { color: '#c5c5c5' }
              : { color: '#030517' }
          }
          fontSize="large"
        />
      </IconButton>,
      // <AiTwotoneDelete
      //   size={20}
      //   key="a"
      //   onClick={() => removeFunction(projectUserRole.id)}
      // />,
      <IconButton
        key={`delete${projectUserRole.id}`}
        size="small"
        disabled={projectUserRole.role == 'member' ? true : false}
        onClick={() => removeFunction(projectUserRole.id)}
      >
        <DeleteIcon
          style={
            projectUserRole.role == 'member'
              ? { color: '#c5c5c5' }
              : { color: '#030517' }
          }
          fontSize="large"
        />
      </IconButton>,
      <IconButton
        key={`active${projectUserRole.id}`}
        size="small"
        onClick={() => activeFunction(projectUserRole.project.id)}
        disabled={projectUserRole.project.id == activeProjectId ? true : false}
      >
        <CheckIcon
          style={
            projectUserRole.project.id == activeProjectId
              ? { color: '#c5c5c5' }
              : { color: '#030517' }
          }
          fontSize="large"
        />
      </IconButton>
    ]
  }))
}

export const usersToSelectMapper = (
  users: QueryAllUsers_usersPermissionsUsers_data[]
) => {
  return users.map((user) => ({
    label: `${user.attributes?.username}`,
    value: `${user.id}`
  }))
}
