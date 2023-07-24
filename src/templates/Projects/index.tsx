import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'

export type ProjectUserRoleType = {
  role: string
  name: string
}

export type ProjectsTemplateProps = {
  projectUserRoles: ProjectUserRoleType[]
}

const Projects = ({ projectUserRoles }: ProjectsTemplateProps) => {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Meus projetos
        </Heading>

        <S.Main>
          <S.Content>{projectUserRoles[0].name}</S.Content>
          <S.Content>{projectUserRoles[1].name}</S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default Projects
