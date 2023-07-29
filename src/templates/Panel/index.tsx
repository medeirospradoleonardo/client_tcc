import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { Project, ProjectsTemplateProps } from 'templates/Projects'

export type PanelTemplateProps = {
  children: React.ReactNode
  projectUserRoles: ProjectsTemplateProps[]
  activeProject: Project
}

const Panel = ({
  children,
  projectUserRoles,
  activeProject
}: PanelTemplateProps) => {
  return (
    <Base
      projectsQuantity={projectUserRoles?.length}
      activeProject={activeProject}
    >
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
