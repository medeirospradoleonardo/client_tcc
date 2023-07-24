import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'

export type ProjectUserRoleType = {
  role: string
  nameProject: string
}

export type ProjectsTemplateProps = {
  projectUserRoles: ProjectUserRoleType[]
}

const Projects = ({ projectUserRoles }: ProjectsTemplateProps) => {
  return (
    <Base projectsQuantity={projectUserRoles?.length}>
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Meus projetos
        </Heading>

        {!!projectUserRoles && (
          <S.Main>
            <S.Content>{projectUserRoles[0].nameProject}</S.Content>
            <S.Content>{projectUserRoles[1].nameProject}</S.Content>
          </S.Main>
        )}
      </Container>
    </Base>
  )
}

export default Projects
