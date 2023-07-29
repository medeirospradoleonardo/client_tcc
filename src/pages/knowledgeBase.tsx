import {
  QueryProfileMe,
  QueryProfileMeVariables
} from 'graphql/generated/QueryProfileMe'
import {
  QueryProjectUserRolesLight,
  QueryProjectUserRolesLightVariables
} from 'graphql/generated/QueryProjectUserRolesLight'
import { QUERY_PROFILE_ME } from 'graphql/queries/profile'
import { QUERY_PROJECT_USER_ROLES_LIGHT } from 'graphql/queries/projectUserRole'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import KnowledgeBase, {
  KnowledgeBaseTemplateProps
} from 'templates/KnowledgeBase'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

export default function KnowledgeBasePage(props: KnowledgeBaseTemplateProps) {
  return (
    <KnowledgeBase
      projectUserRoles={props?.projectUserRoles}
      activeProject={props?.activeProject}
    >
      <h1>Base de conhecimento</h1>
    </KnowledgeBase>
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

  const {
    data: { projectUserRoles }
  } = await apolloClient.query<
    QueryProjectUserRolesLight,
    QueryProjectUserRolesLightVariables
  >({
    query: QUERY_PROJECT_USER_ROLES_LIGHT,
    variables: {
      email: session?.user?.email as string
    },
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      projectUserRoles: projectUserRoles.data,
      activeProject: {
        id: usersPermissionsUser.data?.attributes?.activeProject?.data?.id,
        name: usersPermissionsUser.data?.attributes?.activeProject?.data
          ?.attributes?.name
      }
    }
  }
}
