import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { Project, ProjectsTemplateProps } from 'templates/Projects'

export type KnowledgeBaseTemplateProps = {
  children: React.ReactNode
  projectUserRoles: ProjectsTemplateProps[]
  activeProject: Project
}

const KnowledgeBase = ({
  children,
  projectUserRoles,
  activeProject
}: KnowledgeBaseTemplateProps) => {
  return (
    <Base
      projectsQuantity={projectUserRoles?.length}
      activeProject={activeProject}
    >
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Base de conhecimento
        </Heading>

        <S.Main>
          <S.Content>{children}</S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default KnowledgeBase
