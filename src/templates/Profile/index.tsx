import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { ProjectsTemplateProps } from 'templates/Projects'

export type ProfileTemplateProps = {
  children: React.ReactNode
  projectUserRoles: ProjectsTemplateProps[]
}

const Profile = ({ children, projectUserRoles }: ProfileTemplateProps) => {
  return (
    <Base projectsQuantity={projectUserRoles?.length}>
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
