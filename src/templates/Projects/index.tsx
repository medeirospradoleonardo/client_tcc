import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import Table from 'components/Table'
import { Session } from 'next-auth'
import { useState } from 'react'

type User = {
  id: string
  activeProjectId: string
}

export type Project = {
  id: string
  name: string | undefined
}

export type ProjectUserRoleType = {
  id: string
  role: string
  project: Project
}

export type ProjectsTemplateProps = {
  projectUserRoles: ProjectUserRoleType[]
  user: User
  session: Session
  activeProject: Project
}

const Projects = ({
  projectUserRoles,
  user,
  session,
  activeProject
}: ProjectsTemplateProps) => {
  const [quantity, setQuantity] = useState(projectUserRoles.length)
  const [project, setProject] = useState(activeProject)

  return (
    <Base projectsQuantity={quantity} activeProject={project}>
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Meus projetos
        </Heading>

        <S.Main>
          <S.Content>
            <Heading lineBottom color="black" size="small">
              {quantity} projetos
            </Heading>
            <Table
              projectUserRoleTables={projectUserRoles}
              session={session}
              setQuantityProjectsPage={(quantity: number) =>
                setQuantity(quantity)
              }
              user={user}
              setActiveProjectSideBar={(project: Project) =>
                setProject(project)
              }
            />
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
