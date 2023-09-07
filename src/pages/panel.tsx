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
import Panel, { PanelTemplateProps } from 'templates/Panel'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'
import { getActiveSprint } from 'utils/mappers'

import {
  QUERY_SPRINTS_IN_PROJECT,
  QUERY_SPRINT_BOARDS
} from 'graphql/queries/sprint'
import {
  QuerySprintsInProject,
  QuerySprintsInProjectVariables
} from 'graphql/generated/QuerySprintsInProject'
import {
  QuerySprintBoards,
  QuerySprintBoardsVariables
} from 'graphql/generated/QuerySprintBoards'

export default function PanelPage(props: PanelTemplateProps) {
  return (
    <Panel
      session={props.session}
      user={props?.user}
      projectUserRoles={props?.projectUserRoles}
      activeProject={props?.activeProject}
      activeSprint={props?.activeSprint}
      sprintsSelect={props?.sprintsSelect}
      boards={props?.boards}
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

  const dataSprint = usersPermissionsUser?.data?.attributes?.activeProject?.data
    ?.id
    ? await apolloClient.query<
        QuerySprintsInProject,
        QuerySprintsInProjectVariables
      >({
        query: QUERY_SPRINTS_IN_PROJECT,
        variables: {
          projectId:
            usersPermissionsUser?.data?.attributes?.activeProject?.data?.id ||
            ''
        },
        fetchPolicy: 'no-cache'
      })
    : null

  const activeSprint = usersPermissionsUser?.data?.attributes?.activeSprints
    ?.data
    ? getActiveSprint(
        usersPermissionsUser?.data?.attributes?.activeSprints?.data,
        usersPermissionsUser?.data?.attributes?.activeProject?.data?.id || ''
      )
    : null

  const boards = activeSprint
    ? await apolloClient.query<QuerySprintBoards, QuerySprintBoardsVariables>({
        query: QUERY_SPRINT_BOARDS,
        variables: {
          id: activeSprint?.sprint.id || ''
        },
        fetchPolicy: 'no-cache'
      })
    : null

  return {
    props: {
      session: session,
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
                ?.attributes?.name || ''
          }
        : null,
      activeSprint: activeSprint,
      sprintsSelect: dataSprint
        ? dataSprint.data.sprints?.data.map((s) => ({
            label: s.attributes?.name,
            value: s.id
          }))
        : null,
      boards: boards
        ? boards?.data.sprint?.data?.attributes?.boards?.data?.map((b) => ({
            id: b.id || '',
            title: b.attributes?.title || '',
            timeEstimated: b.attributes?.timeEstimated || 0,
            description: b.attributes?.description || '',
            author: {
              id: b.attributes?.author?.data?.id || '',
              name: b.attributes?.author?.data?.attributes?.username || ''
            },
            responsible: {
              id: b.attributes?.responsible?.data?.id || '',
              name: b.attributes?.responsible?.data?.attributes?.username || ''
            },
            sprint: b.attributes?.sprint?.data?.id || '',
            status: b.attributes?.status || ''
          }))
        : null
    }
  }
}
