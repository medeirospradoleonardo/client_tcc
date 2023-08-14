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
import ProductBacklog, {
  ProductBacklogTemplateProps
} from 'templates/ProductBacklog'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'
import {
  QuerySprints,
  QuerySprintsVariables
} from 'graphql/generated/QuerySprints'
import { QUERY_SPRINT } from 'graphql/queries/sprint'
import { SprintsMapper } from 'utils/mappers'
import { resetServerContext } from 'react-beautiful-dnd'

export default function ProductBacklogPage(props: ProductBacklogTemplateProps) {
  return (
    <ProductBacklog
      session={props.session}
      sprintsData={props.sprintsData}
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
  resetServerContext()
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

  const dataSprint = usersPermissionsUser?.data?.attributes?.activeProject?.data
    ?.id
    ? await apolloClient.query<QuerySprints, QuerySprintsVariables>({
        query: QUERY_SPRINT,
        variables: {
          projectId:
            usersPermissionsUser?.data?.attributes?.activeProject?.data?.id ||
            ''
        },
        fetchPolicy: 'no-cache'
      })
    : null

  return {
    props: {
      session,
      projectUserRoles: projectUserRoles?.data,
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
      sprintsData: dataSprint != null ? SprintsMapper(dataSprint?.data) : null
    }
  }
}