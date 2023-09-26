import {
  QueryProfileMe,
  QueryProfileMeVariables
} from 'graphql/generated/QueryProfileMe'
import {
  QueryProjectUserRolesLight,
  QueryProjectUserRolesLightVariables
} from 'graphql/generated/QueryProjectUserRolesLight'
import { QUERY_PROFILE_ME } from 'graphql/queries/user'
import { QUERY_PROJECT_USER_ROLES_LIGHT } from 'graphql/queries/projectUserRole'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import KnowledgeBase, {
  KnowledgeBaseTemplateProps
} from 'templates/KnowledgeBase'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

import { QUERY_GET_KNOWLEDGES } from 'graphql/queries/knowledge'
import { knowledgesMapper } from 'utils/mappers'
import { QueryGetKnowledges } from 'graphql/generated/QueryGetKnowledges'

export default function KnowledgeBasePage(props: KnowledgeBaseTemplateProps) {
  return (
    <KnowledgeBase
      isAdmin={props.isAdmin}
      user={props?.user}
      session={props?.session}
      knowledges={props?.knowledges}
      projectUserRoles={props?.projectUserRoles}
      activeProject={props?.activeProject}
    />
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/sign-in'
      },
      props: {}
    }
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

  const {
    data: { knowledges }
  } = await apolloClient.query<QueryGetKnowledges>({
    query: QUERY_GET_KNOWLEDGES,
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      session,
      user: {
        id: usersPermissionsUser?.data?.id,
        name: usersPermissionsUser?.data?.attributes?.username
      },
      projectUserRoles: projectUserRoles?.data,
      isAdmin:
        usersPermissionsUser?.data?.attributes?.type == 'admin' ? true : false,
      activeProject: usersPermissionsUser?.data?.attributes?.activeProject?.data
        ? {
            id:
              usersPermissionsUser?.data?.attributes?.activeProject?.data?.id ||
              '',
            name:
              usersPermissionsUser?.data?.attributes?.activeProject?.data
                ?.attributes?.name || ''
          }
        : null,
      knowledges: knowledgesMapper(knowledges)
    }
  }
}
