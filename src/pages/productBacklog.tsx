import { GetServerSidePropsContext } from 'next'
import React from 'react'
import ProductBacklog from 'templates/ProductBacklog'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

export default function ProductBacklogPage() {
  return (
    <ProductBacklog>
      <h1>Backlog do produto</h1>
    </ProductBacklog>
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
