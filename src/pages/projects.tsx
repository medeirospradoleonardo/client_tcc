import { GetServerSidePropsContext } from 'next'

import {
  QueryProjectUserRoles,
  QueryProjectUserRolesVariables
} from 'graphql/generated/QueryProjectUserRoles'
import { QUERY_PROJECT_USER_ROLES } from 'graphql/queries/projectUserRole'
import React from 'react'
import Projects, { ProjectsTemplateProps } from 'templates/Projects'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'
import { projectsMapper } from 'utils/mappers'

export default function MyProjects(props: ProjectsTemplateProps) {
  return <Projects projectUserRoles={props.projectUserRoles} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) {
    return { props: {} }
  }

  const { data } = await apolloClient.query<
    QueryProjectUserRoles,
    QueryProjectUserRolesVariables
  >({
    query: QUERY_PROJECT_USER_ROLES,
    variables: {
      email: session?.user?.email as string
    }
  })

  return {
    props: {
      projectUserRoles: projectsMapper(data.projectUserRoles.data)
    }
  }
}
