import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import Table from 'components/Table'

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

        <S.Main>
          <S.Content>
            <Heading lineBottom color="black" size="small">
              {projectUserRoles.length} projetos
            </Heading>
            <Table />
          </S.Content>
        </S.Main>
        <S.Main></S.Main>
        {/* {projectUserRoles.length > 0 && (
          <S.Main>
            {projectUserRoles.map((projectUserRole) => (
              <S.Content key={projectUserRole.nameProject}>
                {projectUserRole.nameProject}
              </S.Content>
            ))}
          </S.Main>
        )} */}
      </Container>
    </Base>
  )
}

export default Projects
