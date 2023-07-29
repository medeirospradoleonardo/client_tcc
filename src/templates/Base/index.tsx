import Menu from 'components/Menu'
import { useSession } from 'next-auth/client'
import * as S from './styles'

import Sidebar from 'components/Sidebar'
import { SLayout, SMain } from './styles'
import { Project } from 'templates/Projects'

export type BaseTemplateProps = {
  children: React.ReactNode
  projectsQuantity?: number
  activeProject: Project
}

export default function Base({
  children,
  projectsQuantity,
  activeProject
}: BaseTemplateProps) {
  const [session, loading] = useSession()

  return (
    <S.Wrapper>
      <Menu username={session?.user?.name} loading={loading} />
      <S.Content>
        <SLayout>
          <Sidebar
            session={session}
            projectsQuantity={projectsQuantity}
            activeProject={activeProject}
          />
          <SMain>{children}</SMain>
        </SLayout>
      </S.Content>
    </S.Wrapper>
  )
}
