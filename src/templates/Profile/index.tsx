import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { Project, ProjectsTemplateProps } from 'templates/Projects'

export type ProfileTemplateProps = {
  children: React.ReactNode
  projectUserRoles?: ProjectsTemplateProps[] | undefined
  activeProject: Project
}

const Profile = ({
  children,
  projectUserRoles,
  activeProject
}: ProfileTemplateProps) => {
  return (
    <Base
      projectsQuantity={projectUserRoles?.length}
      activeProject={activeProject}
    >
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Meu Perfil
        </Heading>

        <S.Main>
          <S.Content>{children}</S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default Profile
