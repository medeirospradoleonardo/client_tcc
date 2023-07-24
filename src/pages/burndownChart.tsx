import { GetServerSidePropsContext } from 'next'
import React from 'react'
import BurndownChart from 'templates/BurndownChart'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

export default function BurndownChartPage() {
  return (
    <BurndownChart>
      <h1>Gráfico Burndown</h1>
    </BurndownChart>
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
