import Link from 'next/link'

import Heading from 'components/Heading'
import Layout from 'components/Layout'
import Logo from 'components/Logo'
import * as S from './styles'

type AuthProps = {
  title: string
  children: React.ReactNode
}

const Auth = ({ title, children }: AuthProps) => (
  <Layout>
    <S.Wrapper>
      <S.Content>
        <S.ContentWrapper>
          <Link href="/">
            <a>
              <Logo id="content" color="black" size="large" />
            </a>
          </Link>
          <Heading color="black" lineColor="secondary" lineLeft>
            {title}
          </Heading>

          {children}
        </S.ContentWrapper>
        <S.Footer>KamTool 2023 © Todos os Direitos Reservados</S.Footer>
      </S.Content>
    </S.Wrapper>
  </Layout>
)

export default Auth
