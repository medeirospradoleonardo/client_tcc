import {
  QueryProjectUserRolesLight,
  QueryProjectUserRolesLightVariables
} from 'graphql/generated/QueryProjectUserRolesLight'
import { QUERY_PROFILE_ME_BOARDS } from 'graphql/queries/user'
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
import { QUERY_SPRINTS } from 'graphql/queries/sprint'
import { SprintsMapper } from 'utils/mappers'
import { resetServerContext } from 'react-beautiful-dnd'
import {
  QueryProfileMeBoards,
  QueryProfileMeBoardsVariables
} from 'graphql/generated/QueryProfileMeBoards'

export default function ProductBacklogPage(props: ProductBacklogTemplateProps) {
  return (
    <ProductBacklog
      session={props.session}
      sprintsData={props.sprintsData}
      projectUserRoles={props?.projectUserRoles}
      activeProject={props?.activeProject}
      user={props.user}
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
  } = await apolloClient.query<
    QueryProfileMeBoards,
    QueryProfileMeBoardsVariables
  >({
    query: QUERY_PROFILE_ME_BOARDS,
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
        query: QUERY_SPRINTS,
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
      user: {
        id: usersPermissionsUser?.data?.id,
        name: usersPermissionsUser?.data?.attributes?.username
      },
      projectUserRoles: projectUserRoles?.data,
      activeProject: usersPermissionsUser?.data?.attributes?.activeProject?.data
        ? {
            id:
              usersPermissionsUser?.data?.attributes?.activeProject?.data?.id ||
              '',
            name:
              usersPermissionsUser?.data?.attributes?.activeProject?.data
                ?.attributes?.name || '',
            boards:
              usersPermissionsUser?.data?.attributes?.activeProject?.data?.attributes?.boards?.data.map(
                (board) => ({
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
                    name: board.attributes?.responsible?.data?.attributes
                      ?.username
                  },
                  sprint: board.attributes?.sprint?.data?.id || null,
                  status: board.attributes?.status
                })
              )
          }
        : null,
      sprintsData: dataSprint != null ? SprintsMapper(dataSprint?.data) : null
    }
  }
}
