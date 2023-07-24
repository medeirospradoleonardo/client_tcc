import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'

export type HomeTemplateProps = {
  children: React.ReactNode
}

const Home = ({ children }: HomeTemplateProps) => {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Home
        </Heading>

        <S.Main>
          <S.Content>{children}</S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default Home
