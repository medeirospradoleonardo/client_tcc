import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { ProjectsTemplateProps } from 'templates/Projects'

export type PanelTemplateProps = {
  children: React.ReactNode
  projectUserRoles: ProjectsTemplateProps[]
}

const Panel = ({ children, projectUserRoles }: PanelTemplateProps) => {
  return (
    <Base projectsQuantity={projectUserRoles?.length}>
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Painel
        </Heading>

        <S.Main>
          <S.Content>{children}</S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default Panel
