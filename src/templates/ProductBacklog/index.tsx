import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { Project, ProjectsTemplateProps } from 'templates/Projects'
import Logo from 'components/Logo'
import Sprint from 'components/Sprint'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { Dialog } from '@mui/material'
import FormBoard, { FormBoardProps } from 'components/FormBoard'
import Button from 'components/Button'
import FormSprint, { FormSprintProps } from 'components/FormSprint'
import { Session } from 'next-auth'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  MUTATION_DELETE_SPRINT,
  MUTATION_UPDATE_BOARDS
} from 'graphql/mutations/sprint'
import { QuerySprint } from 'graphql/generated/QuerySprint'
import { QUERY_SPRINT, QUERY_SPRINTS_IN_PROJECT } from 'graphql/queries/sprint'
import Confirm from 'components/Confirm'
import { MUTATION_DELETE_BOARD } from 'graphql/mutations/board'
import ProductBacklogComponent from 'components/ProductBacklogComponent'
import { MUTATION_UPDATE_PROJECT_BOARDS } from 'graphql/mutations/project'
import { QUERY_ALL_USERS_IN_PROJECT } from 'graphql/queries/user'

import { pathToSelectMapper, usersToSelectMapper } from 'utils/mappers'
import { QueryAllUsersInProject } from 'graphql/generated/QueryAllUsersInProject'
import { QuerySprintsInProject } from 'graphql/generated/QuerySprintsInProject'
import { QUERY_BOARD } from 'graphql/queries/board'
import { QueryBoard } from 'graphql/generated/QueryBoard'

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
  sprint: string | null
  status: string | null
}

export type Sprint = {
  id: string
  name: string | undefined
  initialDate: string
  finalDate: string
  expand: boolean
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
  user: User
}

const ProductBacklog = ({
  session,
  projectUserRoles,
  activeProject,
  sprintsData,
  user
}: ProductBacklogTemplateProps) => {
  const [openModalBoard, setOpenModalBoard] = useState(false)
  const [openModalSprint, setOpenModalSprint] = useState(false)
  const [openModalDeleteSprint, setOpenModalDeleteSprint] = useState(false)
  const [openModalDeleteBoard, setOpenModalDeleteBoard] = useState(false)
  const [sprintToRemoveId, setSprintToRemoveId] = useState<string>()
  const [boardToRemoveId, setBoardToRemoveId] = useState<string>()

  const [sprints, setSprints] = useState(sprintsData)
  const [project, setProject] = useState(activeProject)

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
        s.expand = sprint.expand
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
      expand: true,
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

  const modalBoardPropsDefault = {
    initialBoard: {
      id: '',
      title: '',
      timeEstimated: 0,
      description: '',
      author: {
        id: '',
        name: ''
      },
      responsible: {
        id: '',
        name: ''
      },
      sprint: '',
      status: ''
    },
    options: 'create',
    activeProject: activeProject,
    usersOptions: [{ label: '', value: '' }],
    pathOptions: [{ label: '', value: '' }],
    closeModal: () => setOpenModalBoard(false),
    user: user
  }

  const [propsModalBoard, setPropsModalBoard] = useState<FormBoardProps>(
    modalBoardPropsDefault
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
          expand: true,
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
              return b
            }
          })
          return s
        })
      )
      const projectNew = {
        id: project.id,
        name: project.name,
        boards: project.boards?.slice()
      }
      projectNew.boards = projectNew.boards?.filter((b) => {
        if (b.id != data.deleteBoard.data.id) {
          return b
        }
      })
      setProject(projectNew)
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

  const [UpdateSprintBoardsGraphQL] = useMutation(MUTATION_UPDATE_BOARDS, {
    context: { session },
    onCompleted: () => {
      //
    }
  })

  const [UpdateProjectBoardsGraphQL] = useMutation(
    MUTATION_UPDATE_PROJECT_BOARDS,
    {
      context: { session }
    }
  )

  const refreshBoards = async (
    idBoard: string,
    idSprintSource: string | null,
    idSprintDestination: string | null,
    idProjectSource: string | null,
    idProjectDestination: string | null,
    indexDestination: number
  ) => {
    let board: Board = {
      id: '',
      title: '',
      timeEstimated: 0,
      description: '',
      author: {
        id: '',
        name: ''
      },
      responsible: {
        id: '',
        name: ''
      },
      sprint: '',
      status: null
    }
    const sprintsNew = [] as Sprint[]
    const sprintsOld = [] as Sprint[]

    const projectNew = {
      id: project.id,
      name: project.name,
      boards: project.boards?.slice()
    }

    const projectOld = {
      id: project.id,
      name: project.name,
      boards: project.boards?.slice()
    }

    sprints.map((s) => {
      sprintsNew.push({
        id: s.id,
        name: s.name,
        expand: s.expand,
        initialDate: s.initialDate,
        finalDate: s.finalDate,
        boards: s.boards.slice()
      })

      sprintsOld.push({
        id: s.id,
        name: s.name,
        expand: s.expand,
        initialDate: s.initialDate,
        finalDate: s.finalDate,
        boards: s.boards.slice()
      })
    })

    if (idProjectSource || idProjectDestination) {
      projectNew.boards = projectNew.boards?.filter((b) => {
        if (b.id != idBoard) {
          return b
        } else {
          board = b
        }
      })
    }
    const sprintSourceBoardsIds = [] as string[]
    idSprintSource &&
      sprintsNew.map((s) => {
        if (s.id == idSprintSource) {
          s.boards = s.boards.filter((b) => {
            if (b.id != idBoard) {
              sprintSourceBoardsIds.push(b.id)
              return b
            } else {
              board = b
            }
          })
        }
      })

    let sprintDestinationBoardsIds
    idSprintDestination &&
      sprintsNew.map((s) => {
        if (s.id == idSprintDestination) {
          board.sprint = idSprintDestination
          projectNew.boards = projectNew.boards?.concat([board])
          s.boards.splice(indexDestination, 0, board)
          sprintDestinationBoardsIds = s.boards.map((b) => b.id)
        }
      })

    let projectDestinationBoardsIds: string[] = []
    if (idProjectDestination && projectNew.boards) {
      board.sprint = null
      const boardsProjectWithSprint = projectNew.boards.filter(
        (b) => b.sprint != null
      )
      const boardsProjectWithNoSprint = projectNew.boards.filter(
        (b) => b.sprint == null
      )
      boardsProjectWithNoSprint.splice(indexDestination, 0, board)

      projectNew.boards = boardsProjectWithSprint.concat(
        boardsProjectWithNoSprint
      )
      projectDestinationBoardsIds = projectNew.boards.map((b) => b.id)
    }

    setSprints(sprintsNew)
    setProject(projectNew)

    if (idSprintDestination) {
      const { errors: errorsUpdateSprint, data: dataUpdateSprint } =
        await UpdateSprintBoardsGraphQL({
          variables: {
            id: idSprintDestination,
            boardsIds: sprintDestinationBoardsIds
          }
        })

      if (
        errorsUpdateSprint != null ||
        dataUpdateSprint.updateSprint.data == null
      ) {
        setSprints(sprintsOld)
      }
    } else if (idSprintSource) {
      const { errors: errorsUpdateSprint, data: dataUpdateSprint } =
        await UpdateSprintBoardsGraphQL({
          variables: {
            id: idSprintSource,
            boardsIds: sprintSourceBoardsIds
          }
        })

      if (
        errorsUpdateSprint != null ||
        dataUpdateSprint.updateSprint.data == null
      ) {
        setSprints(sprintsOld)
      }
    }

    if (idProjectDestination) {
      const { errors: errorsUpdateProject, data: dataUpdateProject } =
        await UpdateProjectBoardsGraphQL({
          variables: {
            id: idProjectDestination,
            boardsIds: projectDestinationBoardsIds
          }
        })

      if (
        errorsUpdateProject != null ||
        dataUpdateProject.updateProject.data == null
      ) {
        setProject(projectOld)
      }
    }
  }

  const onDragEnd = async (result: DropResult) => {
    // moveu e deixou em um lugar nao valido
    if (!result.destination) {
      return
    }

    const source = result.source
    const destination = result.destination

    // moveu e deixou no mesmo lugar
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceObj = result.source?.droppableId.includes('sprint-')
      ? {
          mode: 'sprint',
          id: result.source?.droppableId.replace('sprint-', '')
        }
      : {
          mode: 'project',
          id: result.source?.droppableId.replace('productBacklog-', '')
        }

    const destinationObj = result.destination?.droppableId.includes('sprint-')
      ? {
          mode: 'sprint',
          id: result.destination?.droppableId.replace('sprint-', '')
        }
      : {
          mode: 'project',
          id: result.destination?.droppableId.replace('productBacklog-', '')
        }

    const boardId = result.draggableId.replace('draggable-', '')

    if (destinationObj.mode == 'sprint') {
      if (sourceObj.mode == 'sprint') {
        refreshBoards(
          boardId,
          sourceObj.id,
          destinationObj.id,
          null,
          null,
          destination.index
        )
      } else {
        refreshBoards(
          boardId,
          null,
          destinationObj.id,
          sourceObj.id,
          null,
          destination.index
        )
      }
    } else {
      if (sourceObj.mode == 'project') {
        refreshBoards(
          boardId,
          null,
          null,
          sourceObj.id,
          destinationObj.id,
          destination.index
        )
      } else {
        refreshBoards(
          boardId,
          sourceObj.id,
          null,
          null,
          destinationObj.id,
          destination.index
        )
      }
    }
  }

  const [getBoardGraphql, { data: dataQueryBoard }] = useLazyQuery<QueryBoard>(
    QUERY_BOARD,
    {
      context: { session },
      onCompleted: () => {
        const modalBoardPropsNew = propsModalBoard
        modalBoardPropsNew.option = 'edit'
        modalBoardPropsNew.initialBoard = {
          id: dataQueryBoard?.board?.data?.id || '',
          title: dataQueryBoard?.board?.data?.attributes?.title || '',
          timeEstimated:
            dataQueryBoard?.board?.data?.attributes?.timeEstimated || 0,
          description:
            dataQueryBoard?.board?.data?.attributes?.description || '',
          author: {
            id: dataQueryBoard?.board?.data?.attributes?.author?.data?.id || '',
            name:
              dataQueryBoard?.board?.data?.attributes?.author?.data?.attributes
                ?.username || ''
          },
          responsible: {
            id:
              dataQueryBoard?.board?.data?.attributes?.responsible?.data?.id ||
              '',
            name:
              dataQueryBoard?.board?.data?.attributes?.responsible?.data
                ?.attributes?.username || ''
          },
          sprint:
            dataQueryBoard?.board?.data?.attributes?.sprint?.data?.id || '',
          status: `${dataQueryBoard?.board?.data?.attributes?.status}`
        }
        setPropsModalBoard(modalBoardPropsNew)
      }
    }
  )

  const [getAllUsersInProject, { data: QueryAllUsers }] =
    useLazyQuery<QueryAllUsersInProject>(QUERY_ALL_USERS_IN_PROJECT, {
      context: { session },
      onCompleted: () => {
        const modalBoardPropsNew = propsModalBoard
        modalBoardPropsNew.usersOptions = usersToSelectMapper(
          QueryAllUsers?.usersPermissionsUsers?.data || []
        )
        setPropsModalBoard(modalBoardPropsNew)
      }
    })

  const [getAllSprintInProject, { data: QueryAllSprintsInProject }] =
    useLazyQuery<QuerySprintsInProject>(QUERY_SPRINTS_IN_PROJECT, {
      context: { session },
      onCompleted: () => {
        const modalBoardPropsNew = propsModalBoard
        modalBoardPropsNew.pathOptions = pathToSelectMapper(
          QueryAllSprintsInProject?.sprints?.data || [],
          project.id
        )
        setPropsModalBoard(modalBoardPropsNew)
      }
    })

  const createBoard = async (idPath: string | null) => {
    setPropsModalBoard(modalBoardPropsDefault)
    if (idPath) {
      const modalBoardPropsNew = modalBoardPropsDefault
      modalBoardPropsNew.initialBoard.sprint = idPath
      setPropsModalBoard(modalBoardPropsNew)
    }
    await getAllUsersInProject({
      variables: {
        projectId: project.id
      },
      fetchPolicy: 'no-cache'
    })
    await getAllSprintInProject({
      variables: {
        projectId: project.id
      },
      fetchPolicy: 'no-cache'
    })
    setOpenModalBoard(true)
  }

  const editBoard = async (id: string) => {
    setPropsModalBoard(modalBoardPropsDefault)
    await getAllUsersInProject({
      variables: {
        projectId: project.id
      },
      fetchPolicy: 'no-cache'
    })
    await getAllSprintInProject({
      variables: {
        projectId: project.id
      },
      fetchPolicy: 'no-cache'
    })
    await getBoardGraphql({
      variables: {
        boardId: id
      },
      fetchPolicy: 'no-cache'
    })
    setOpenModalBoard(true)
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
              maxWidth="md"
              onClose={handleClose}
            >
              <FormBoard {...propsModalBoard} />
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
                  <DragDropContext onDragEnd={onDragEnd}>
                    {sprints.map((sprint) => (
                      <Sprint
                        session={session}
                        deleteBoard={removeBoardSelect}
                        editSprint={editSprint}
                        deleteSprint={removeSprintSelect}
                        key={sprint.id}
                        sprint={sprint}
                        createBoard={createBoard}
                        editBoard={editBoard}
                      />
                    ))}
                    <ProductBacklogComponent
                      project={project}
                      deleteBoard={removeBoardSelect}
                      createBoard={createBoard}
                      editBoard={editBoard}
                    />
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
