import Menu from 'components/Menu'
import { useSession } from 'next-auth/client'
import * as S from './styles'

import Sidebar from 'components/Sidebar'
import { SLayout, SMain } from './styles'
import { Project } from 'templates/Projects'

export type BaseTemplateProps = {
  children: React.ReactNode
  projectsQuantity?: number
  activeProject?: Project | null
}

export default function Base({
  children,
  projectsQuantity,
  activeProject
}: BaseTemplateProps) {
  const [session, loading] = useSession()

  return (
    <S.Wrapper>
      <S.Menu>
        <Menu username={session?.user?.name} loading={loading} />
      </S.Menu>
      <S.Content>
        <SLayout>
          <S.Sidebar>
            <Sidebar
              session={session}
              projectsQuantity={projectsQuantity}
              activeProject={activeProject}
            />
          </S.Sidebar>
          <SMain>{children}</SMain>
        </SLayout>
      </S.Content>
    </S.Wrapper>
  )
}
