import {
  QueryProjectUserRoles,
  QueryProjectUserRolesVariables
} from 'graphql/generated/QueryProjectUserRoles'
import { QUERY_PROJECT_USER_ROLES } from 'graphql/queries/projectUserRole'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import Panel, { PanelTemplateProps } from 'templates/Panel'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

export default function PanelPage(props: PanelTemplateProps) {
  return (
    <Panel projectUserRoles={props?.projectUserRoles}>
      <h1>Painel</h1>
    </Panel>
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
