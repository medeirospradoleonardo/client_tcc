import { GetServerSidePropsContext } from 'next'
import React from 'react'
import Panel from 'templates/Panel'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

export default function PanelPage() {
  return (
    <Panel>
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

  return {
    props: {}
  }
}
