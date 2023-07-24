import Menu from 'components/Menu'
import { useSession } from 'next-auth/client'
import * as S from './styles'

import Sidebar from 'components/Sidebar'
import { SLayout, SMain } from './styles'

export type BaseTemplateProps = {
  children: React.ReactNode
}

const Base = ({ children }: BaseTemplateProps) => {
  const [session, loading] = useSession()

  return (
    <S.Wrapper>
      <Menu username={session?.user?.name} loading={loading} />
      <S.Content>
        <SLayout>
          <Sidebar session={session} />
          <SMain>{children}</SMain>
        </SLayout>
      </S.Content>
    </S.Wrapper>
  )
}

export default Base
