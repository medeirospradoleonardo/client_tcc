import {
  QueryProjectUserRoles,
  QueryProjectUserRolesVariables
} from 'graphql/generated/QueryProjectUserRoles'
import { QUERY_PROJECT_USER_ROLES } from 'graphql/queries/projectUserRole'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import KnowledgeBase, {
  KnowledgeBaseTemplateProps
} from 'templates/KnowledgeBase'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

export default function KnowledgeBasePage(props: KnowledgeBaseTemplateProps) {
  return (
    <KnowledgeBase projectUserRoles={props?.projectUserRoles}>
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
    data: { projectUserRoles }
  } = await apolloClient.query<
    QueryProjectUserRoles,
    QueryProjectUserRolesVariables
  >({
    query: QUERY_PROJECT_USER_ROLES,
    variables: {
      email: session?.user?.email as string
    }
  })

  return {
    props: { projectUserRoles: projectUserRoles.data }
  }
}
