import { GetServerSidePropsContext } from 'next'

import { QUERY_PROJECT_USER_ROLES_FULL } from 'graphql/queries/projectUserRole'
import React from 'react'
import Projects, { ProjectsTemplateProps } from 'templates/Projects'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

import {
  QueryProjectUserRolesFull,
  QueryProjectUserRolesFullVariables
} from 'graphql/generated/QueryProjectUserRolesFull'
import { projectsMapper } from 'utils/mappers'
import {
  QueryProfileMe,
  QueryProfileMeVariables
} from 'graphql/generated/QueryProfileMe'
import { QUERY_PROFILE_ME } from 'graphql/queries/user'

export default function MyProjects(props: ProjectsTemplateProps) {
  return (
    <Projects
      projectUserRoles={props?.projectUserRoles}
      user={props.user}
      session={props.session}
      activeProject={props.activeProject}
    />
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) {
    return { props: {} }
  }

  const {
    data: { usersPermissionsUser }
  } = await apolloClient.query<QueryProfileMe, QueryProfileMeVariables>({
    query: QUERY_PROFILE_ME,
    variables: {
      identifier: session?.id as string
    },
    fetchPolicy: 'no-cache'
  })

  const { data } = await apolloClient.query<
    QueryProjectUserRolesFull,
    QueryProjectUserRolesFullVariables
  >({
    query: QUERY_PROJECT_USER_ROLES_FULL,
    variables: {
      email: session?.user?.email as string
    },
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      session,
      projectUserRoles: projectsMapper(data.projectUserRoles.data),
      user: {
        id: usersPermissionsUser?.data?.id,
        activeProjectId:
          usersPermissionsUser.data?.attributes?.activeProject?.data?.id ||
          null,
        name: usersPermissionsUser.data?.attributes?.username
      },
      activeProject: {
        id:
          usersPermissionsUser.data?.attributes?.activeProject?.data?.id ||
          null,
        name:
          usersPermissionsUser.data?.attributes?.activeProject?.data?.attributes
            ?.name || null
      }
    }
  }
}
