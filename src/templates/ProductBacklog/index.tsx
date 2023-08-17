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
import FormSprint, { FormSprintProps } from 'components/FormSprint'
import { Session } from 'next-auth'
import { useLazyQuery, useMutation } from '@apollo/client'
import { MUTATION_DELETE_SPRINT } from 'graphql/mutations/sprint'
import { QuerySprint } from 'graphql/generated/QuerySprint'
import { QUERY_SPRINT } from 'graphql/queries/sprint'
import Confirm from 'components/Confirm'
import { MUTATION_DELETE_BOARD } from 'graphql/mutations/board'

export type User = {
  id: string
  name: string
}

export type Board = {
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
  const [openModalSprint, setOpenModalSprint] = useState(false)
  const [openModalDeleteSprint, setOpenModalDeleteSprint] = useState(false)
  const [openModalDeleteBoard, setOpenModalDeleteBoard] = useState(false)
  const [sprintToRemoveId, setSprintToRemoveId] = useState<string>()
  const [boardToRemoveId, setBoardToRemoveId] = useState<string>()

  const [sprints, setSprints] = useState(sprintsData)

  const handleClose = (event: React.MouseEventHandler, reason: string) => {
    if (reason && reason == 'backdropClick') return
    setOpenModalBoard(false)
    setOpenModalSprint(false)
    setOpenModalDeleteSprint(false)
    setOpenModalDeleteBoard(false)
  }

  const refreshSprints = (sprint: Sprint) => {
    let edit = false
    sprints.map((s) => {
      if (s.id == sprint.id) {
        s.name = sprint.name
        s.initialDate = sprint.initialDate
        s.finalDate = sprint.finalDate
        setSprints(sprints)
        edit = true
        return
      }
    })

    !edit && setSprints(sprints.concat([sprint]))
  }

  const modalSprintPropsDefault = {
    initialSprint: {
      id: '',
      name: '',
      initialDate: '',
      finalDate: '',
      boards: []
    },
    session: session,
    activeProject: activeProject,
    closeModal: () => setOpenModalSprint(false),
    setSprints: refreshSprints
  }

  const [propsModalSprint, setPropsModalSprint] = useState<FormSprintProps>(
    modalSprintPropsDefault
  )

  const createSprint = () => {
    setPropsModalSprint(modalSprintPropsDefault)
    setOpenModalSprint(true)
  }

  const [getSprint, { data: sprintsQueryData }] = useLazyQuery<QuerySprint>(
    QUERY_SPRINT,
    {
      context: { session },
      onCompleted: () => {
        const propsModalSprintNew = propsModalSprint
        propsModalSprintNew.option = 'edit'
        propsModalSprintNew.initialSprint = {
          id: sprintsQueryData?.sprint?.data?.id || '',
          name: sprintsQueryData?.sprint?.data?.attributes?.name,
          initialDate: sprintsQueryData?.sprint?.data?.attributes?.initialDate,
          finalDate: sprintsQueryData?.sprint?.data?.attributes?.finalDate,
          boards: []
        }
        setPropsModalSprint(propsModalSprintNew)
      }
    }
  )

  const editSprint = async (id: string) => {
    await getSprint({
      variables: {
        id: id
      },
      fetchPolicy: 'no-cache'
    })
    setOpenModalSprint(true)
  }

  const [deleteSprintGraphQL] = useMutation(MUTATION_DELETE_SPRINT, {
    context: { session },
    onCompleted: (data) => {
      setSprints(
        sprints.filter((sprint) => {
          if (sprint.id != data.deleteSprint.data.id) {
            return sprint
          }
        })
      )

      setOpenModalDeleteSprint(false)
    }
  })

  const deleteSprint = (id: string) => {
    deleteSprintGraphQL({
      variables: {
        id: id
      }
    })
  }

  const [deleteBoardGraphQL] = useMutation(MUTATION_DELETE_BOARD, {
    context: { session },
    onCompleted: (data) => {
      setSprints(
        sprints.map((s) => {
          s.boards = s.boards.filter((b) => {
            if (b.id != data.deleteBoard.data.id) {
              console.log('fesfs')
              return b
            }
          })
          return s
        })
      )
      setOpenModalDeleteBoard(false)
    }
  })

  const deleteBoard = (id: string) => {
    deleteBoardGraphQL({
      variables: {
        id: id
      }
    })
  }

  const removeSprintSelect = (id: string) => {
    setOpenModalDeleteSprint(true)
    setSprintToRemoveId(id)
  }

  const removeBoardSelect = (id: string) => {
    setOpenModalDeleteBoard(true)
    setBoardToRemoveId(id)
  }

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={openModalDeleteBoard}
        onClose={handleClose}
      >
        <Confirm
          closeModal={() => setOpenModalDeleteBoard(false)}
          buttonLabel="Deletar"
          message="Você tem certeza que deseja deletar esse board?"
          actionFunction={() => deleteBoard(boardToRemoveId || '')}
        />
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={openModalDeleteSprint}
        onClose={handleClose}
      >
        <Confirm
          closeModal={() => setOpenModalDeleteSprint(false)}
          buttonLabel="Deletar"
          message="Você tem certeza que deseja deletar esse sprint?"
          actionFunction={() => deleteSprint(sprintToRemoveId || '')}
        />
      </Dialog>
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
              <FormSprint {...propsModalSprint} />
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
                    onClick={createSprint}
                  >
                    Criar sprint
                  </Button>
                  <DragDropContext onDragEnd={() => console.log('Oi')}>
                    {sprints.map((sprint) => (
                      <Sprint
                        deleteBoard={removeBoardSelect}
                        editSprint={editSprint}
                        deleteSprint={removeSprintSelect}
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
