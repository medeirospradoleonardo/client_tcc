import { GetServerSidePropsContext } from 'next'

import Profile, { ProfileTemplateProps } from 'templates/Profile'
import FormProfile, { FormProfileProps } from 'components/FormProfile'

import protectedRoutes from 'utils/protected-routes'
import { initializeApollo } from 'utils/apollo'
import {
  QueryProfileMe,
  QueryProfileMeVariables
} from 'graphql/generated/QueryProfileMe'
import { QUERY_PROFILE_ME } from 'graphql/queries/user'

import { QUERY_PROJECT_USER_ROLES_LIGHT } from 'graphql/queries/projectUserRole'
import {
  QueryProjectUserRolesLight,
  QueryProjectUserRolesLightVariables
} from 'graphql/generated/QueryProjectUserRolesLight'

export default function Me(
  props: FormProfileProps &
    Pick<ProfileTemplateProps, 'projectUserRoles'> &
    Pick<ProfileTemplateProps, 'activeProject'>
) {
  return (
    <Profile
      projectUserRoles={props?.projectUserRoles}
      activeProject={props.activeProject}
    >
      <FormProfile
        session={props.session}
        email={props.email}
        username={props.username}
      />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) {
    return { props: {} }
  }

  const { data } = await apolloClient.query<
    QueryProfileMe,
    QueryProfileMeVariables
  >({
    query: QUERY_PROFILE_ME,
    variables: {
      identifier: session?.id as string
    }
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
      session,
      username: data.usersPermissionsUser?.data?.attributes?.username,
      email: data.usersPermissionsUser?.data?.attributes?.email,
      projectUserRoles: projectUserRoles.data,
      activeProject: {
        id:
          data.usersPermissionsUser.data?.attributes?.activeProject?.data?.id ||
          null,
        name:
          data.usersPermissionsUser.data?.attributes?.activeProject?.data
            ?.attributes?.name || null
      }
    }
  }
}
