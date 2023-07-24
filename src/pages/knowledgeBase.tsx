import { GetServerSidePropsContext } from 'next'
import React from 'react'
import KnowledgeBase from 'templates/KnowledgeBase'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

export default function KnowledgeBasePage() {
  return (
    <KnowledgeBase>
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

  return {
    props: {}
  }
}
