import { QueryProjectUserRolesFull } from 'graphql/generated/QueryProjectUserRolesFull'
import { ProjectUserRoleType } from 'templates/Projects'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { QueryAllUsers_usersPermissionsUsers_data } from 'graphql/generated/QueryAllUsers'
import { QuerySprints } from 'graphql/generated/QuerySprints'
import { Sprint } from 'templates/ProductBacklog'
import { QuerySprintsInProject_sprints_data } from 'graphql/generated/QuerySprintsInProject'
import { User } from 'components/Table'
import { QueryProjectUserRolesLight_projectUserRoles_data } from 'graphql/generated/QueryProjectUserRolesLight'

export const projectsMapper = (projectUserRoles: QueryProjectUserRolesFull) => {
  return projectUserRoles.projectUserRoles?.data.map((projectUserRole) => ({
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

export const SprintsMapper = (sprints: QuerySprints) => {
  return sprints.sprints?.data.map((s) => ({
    id: s.id,
    name: s.attributes?.name,
    initialDate: s.attributes?.initialDate,
    finalDate: s.attributes?.finalDate,
    expand: s.attributes?.expand,
    boards: s.attributes?.boards?.data.map((board) => ({
      id: board.id,
      title: board.attributes?.title,
      timeEstimated: board.attributes?.timeEstimated,
      description: board.attributes?.description,
      author: {
        id: board.attributes?.author?.data?.id,
        name: board.attributes?.author?.data?.attributes?.username
      },
      responsible: {
        id: board.attributes?.responsible?.data?.id,
        name: board.attributes?.responsible?.data?.attributes?.username
      },
      sprint: board.attributes?.sprint?.data?.id,
      status: board.attributes?.status
    }))
  })) as Sprint[]
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

export const getUserRole = (
  projectUserRolesData:
    | QueryProjectUserRolesLight_projectUserRoles_data[]
    | undefined,
  activeProjectId: string | null
) => {
  let role
  projectUserRolesData?.map((p) => {
    if (p.attributes?.project?.data?.id == activeProjectId) {
      role = p.attributes?.role
      return
    }
  })

  return role
}

export const projectsToTableMapper = (
  user: User,
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
        disabled={
          projectUserRole.role == 'member' && user.type != 'admin'
            ? true
            : false
        }
        onClick={() => editFunction(projectUserRole.project.id)}
      >
        <EditIcon
          style={
            projectUserRole.role == 'member' && user.type != 'admin'
              ? { color: '#c5c5c5' }
              : { color: '#030517' }
          }
          fontSize="large"
        />
      </IconButton>,
      <IconButton
        key={`delete${projectUserRole.id}`}
        size="small"
        disabled={
          projectUserRole.role == 'member' && user.type != 'admin'
            ? true
            : false
        }
        onClick={() => removeFunction(projectUserRole.project.id)}
      >
        <DeleteIcon
          style={
            projectUserRole.role == 'member' && user.type != 'admin'
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
  const usersSort = users.sort(function (a, b) {
    const aUsername = a.attributes ? a.attributes.username : ''
    const bUsername = b.attributes ? b.attributes.username : ''
    if (aUsername < bUsername) {
      return -1
    }
    if (aUsername > bUsername) {
      return 1
    }
    return 0
  })
  return usersSort.map((user) => ({
    label: `${user.attributes?.username}`,
    value: `${user.id}`
  }))
}

export const pathToSelectMapper = (
  sprints: QuerySprintsInProject_sprints_data[],
  projectId: string
) => {
  return [{ label: 'Backlog do produto', value: projectId }].concat(
    sprints.map((sprint) => ({
      label: `${sprint.attributes?.name}`,
      value: `${sprint.id}`
    }))
  )
}

export const getBoardStatus = (status: string | null) => {
  switch (status) {
    case 'notInitiated':
      return {
        title: 'NÃO INICIADO',
        color: '#DA5757'
      }
    case 'inProgress':
      return {
        title: 'EM PROGRESSO',
        color: '#a6b805'
      }
    case 'concluded':
      return {
        title: 'CONCLUÍDO',
        color: '#11831a'
      }
  }

  return {
    title: 'NÃO INICIADO',
    color: '#DA5757'
  }
}
