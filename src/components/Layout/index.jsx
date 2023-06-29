import React from 'react'
import Sidebar from 'components/Sidebar'
import { SLayout, SMain } from './styles'
import Base from 'templates/Base'

const Layout = ({ children }) => {
  return (
    <Base>
      <SLayout>
        <Sidebar />
        <SMain>{children}</SMain>
      </SLayout>
    </Base>
  )
}

export default Layout
