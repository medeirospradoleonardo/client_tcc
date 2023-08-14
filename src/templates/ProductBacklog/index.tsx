import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { Project, ProjectsTemplateProps } from 'templates/Projects'
import Logo from 'components/Logo'
import Sprint from 'components/Sprint'
import { DragDropContext } from 'react-beautiful-dnd'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { Dialog } from '@mui/material'
import FormBoard from 'components/FormBoard'
import Button from 'components/Button'
import FormSprint from 'components/FormSprint'
import { Session } from 'next-auth'
import { useMutation } from '@apollo/client'
import { MUTATION_DELETE_SPRINT } from 'graphql/mutations/sprint'

export type User = {
  id: string
  name: string
}

type Board = {
  id: string
  title: string
  timeEstimated: number
  description: string
  author: User
  responsible: User
  status: 'Não iniciado' | 'Em progresso' | 'Concluído'
}

export type Sprint = {
  id: string
  name: string | undefined
  initialDate: string
  finalDate: string
  boards: Board[]
}

export type SprintProps = {
  sprints: Sprint[]
}

export type ProductBacklogTemplateProps = {
  session: Session
  projectUserRoles: ProjectsTemplateProps[]
  activeProject: Project
  sprintsData: Sprint[]
}

const ProductBacklog = ({
  session,
  projectUserRoles,
  activeProject,
  sprintsData
}: ProductBacklogTemplateProps) => {
  const [openModalBoard, setOpenModalBoard] = useState(false)
  const [openModalSprint, setOpenModalSprint] = useState(true)

  const [sprints, setSprints] = useState(sprintsData)

  const handleClose = (event: React.MouseEventHandler, reason: string) => {
    if (reason && reason == 'backdropClick') return
    setOpenModalBoard(false)
    setOpenModalSprint(false)
  }

  const createSprint = (sprint: Sprint) => {
    setSprints(sprints.concat([sprint]))
  }

  const [deleteSprintGraphQL] = useMutation(MUTATION_DELETE_SPRINT, {
    context: { session }
  })

  const deleteSprint = async (id: string) => {
    const { errors: errorsDeleteSprint } = await deleteSprintGraphQL({
      variables: {
        id: id
      }
    })

    if (errorsDeleteSprint) {
      return
    }

    setSprints(
      sprints.filter((sprint) => {
        if (sprint.id != id) {
          return sprint
        }
      })
    )
  }

  return (
    <>
      <Base
        projectsQuantity={projectUserRoles?.length}
        activeProject={activeProject}
      >
        {activeProject ? (
          <>
            <Dialog
              open={openModalBoard}
              fullWidth={true}
              maxWidth="xs"
              onClose={handleClose}
            >
              <FormBoard closeModal={() => setOpenModalBoard(false)} />
            </Dialog>
            <Dialog
              open={openModalSprint}
              fullWidth={true}
              maxWidth="xs"
              onClose={handleClose}
            >
              <FormSprint
                setSprints={createSprint}
                activeProject={activeProject}
                session={session}
                closeModal={() => setOpenModalSprint(false)}
              />
            </Dialog>
            <Container>
              <Heading lineLeft lineColor="secondary" color="black">
                Backlog do produto
              </Heading>

              <S.Main>
                <S.Content>
                  <Button
                    size="small"
                    icon={<AddIcon />}
                    style={{ marginBottom: '10px' }}
                    onClick={() => setOpenModalSprint(true)}
                  >
                    Criar sprint
                  </Button>
                  <DragDropContext onDragEnd={() => console.log('Oi')}>
                    {sprints.map((sprint) => (
                      <Sprint
                        deleteSprint={deleteSprint}
                        key={sprint.id}
                        sprint={sprint}
                        openModal={() => setOpenModalBoard(true)}
                      />
                    ))}
                  </DragDropContext>
                </S.Content>
              </S.Main>
            </Container>
          </>
        ) : (
          <Container>
            <Heading lineLeft lineColor="secondary" color="black">
              Backlog do produto
            </Heading>

            <S.Main>
              <S.Content>
                <Logo color="black" />
                <h1 style={{ marginLeft: '20px' }}>
                  Você precisa ter um projeto selecionado para acessar essa
                  seção
                </h1>
              </S.Content>
            </S.Main>
          </Container>
        )}
      </Base>
    </>
  )
}

export default ProductBacklog
