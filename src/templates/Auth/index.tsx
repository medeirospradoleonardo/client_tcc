import Heading from 'components/Heading'
import * as S from './styles'
import Base from 'templates/Base'
import { Container } from 'components/Container'

type AuthProps = {
  title: string
  children: React.ReactNode
}

const Auth = ({ title, children }: AuthProps) => (
  <Base>
    <Container>
      <S.Wrapper>
        <S.Content>
          <Heading color="black" lineColor="secondary" lineLeft>
            {title}
          </Heading>
          <S.ContentWrapper>{children}</S.ContentWrapper>
          {/* <S.Footer>KamTool 2023 © Todos os Direitos Reservados</S.Footer> */}
        </S.Content>
      </S.Wrapper>
    </Container>
  </Base>
)

export default Auth
