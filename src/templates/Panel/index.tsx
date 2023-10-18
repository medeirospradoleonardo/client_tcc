import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { Project, ProjectsTemplateProps } from 'templates/Projects'
import Status from 'components/Status'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import SelectComponent, { OptionType } from 'components/Select'
import { colourStylesStatus } from 'components/Select/configSelectResponsible'
import { Board, User } from 'templates/ProductBacklog'

import WithoutProject from 'components/WithoutProject'
import { useState } from 'react'
import {
  QUERY_SPRINTS_IN_PROJECT,
  QUERY_SPRINT_BOARDS
} from 'graphql/queries/sprint'
import { useLazyQuery, useMutation } from '@apollo/client'
import { QuerySprintBoards } from 'graphql/generated/QuerySprintBoards'
import { Session } from 'next-auth'
import {
  MUTATION_CREATE_ACTIVE_SPRINT,
  MUTATION_UPDATE_ACTIVE_SPRINT
} from 'graphql/mutations/activeSprint'
import {
  MUTATION_DELETE_BOARD,
  MUTATION_UPDATE_BOARD
} from 'graphql/mutations/board'
import Confirm from 'components/Confirm'
import { Dialog } from '@mui/material'
import FormBoard, { FormBoardProps } from 'components/FormBoard'
import { QueryAllUsersInProject } from 'graphql/generated/QueryAllUsersInProject'
import { QUERY_ALL_USERS_IN_PROJECT } from 'graphql/queries/user'
import { pathToSelectMapper, usersToSelectMapper } from 'utils/mappers'
import { QuerySprintsInProject } from 'graphql/generated/QuerySprintsInProject'
import { QUERY_BOARD } from 'graphql/queries/board'
import { QueryBoard } from 'graphql/generated/QueryBoard'
import { MUTATION_UPDATE_BOARDS } from 'graphql/mutations/sprint'

type ActiveSprintType = {
  id: string
  sprint: {
    id: string
    name: string
  }
}

export type PanelTemplateProps = {
  userRole: string
  session: Session
  user: User
  projectUserRoles: ProjectsTemplateProps[]
  activeProject: Project
  activeSprint: ActiveSprintType
  sprintsSelect: OptionType[]
  boards?: Board[]
}

const Panel = ({
  userRole,
  session,
  user,
  projectUserRoles,
  activeProject,
  activeSprint,
  sprintsSelect,
  boards
}: PanelTemplateProps) => {
  // const [boardsNotInitiated, setBoardsNotInitiated] = useState<Board[]>()
  // const [boardsInProgress, setBoardsInProgress] = useState<Board[]>()
  // const [boardsConcluded, setBoardsConcluded] = useState<Board[]>()

  const [openModalBoard, setOpenModalBoard] = useState(false)
  const [openModalDeleteBoard, setOpenModalDeleteBoard] = useState(false)
  const [boardToRemoveId, setBoardToRemoveId] = useState<string>()

  const [activeSprintData, setActiveSprintData] =
    useState<ActiveSprintType>(activeSprint)
  const [boardsData, setBoardsData] = useState<Board[] | undefined>(boards)

  const handleClose = (event: React.MouseEventHandler, reason: string) => {
    if (reason && reason == 'backdropClick') return

    setOpenModalDeleteBoard(false)
    setOpenModalBoard(false)
  }

  const removeBoardSelect = (id: string) => {
    setOpenModalDeleteBoard(true)
    setBoardToRemoveId(id)
  }

  // Entender que quando voce altera o status na edicao, ele entra como primeiro item na coluna nova
  const refreshBoardForm = async (board: Board) => {
    const boardsDataOld = boardsData?.slice()
    let boardsDataNew = boardsData?.slice()

    // se mudar de destino
    if (board.sprint != activeSprintData.sprint.id) {
      boardsDataNew = boardsDataNew?.filter((b) => b.id != board.id)
      setBoardsData(boardsDataNew)
      setOpenModalBoard(false)
      return
    }

    const oldBoard: Board = {
      id: '',
      title: '',
      timeEstimated: 1,
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
    }

    boardsData?.map((b) => {
      if (b.id == board.id) {
        oldBoard.id = b.id
        oldBoard.title = b.title
        oldBoard.timeEstimated = b.timeEstimated
        oldBoard.description = b.description
        oldBoard.author = b.author
        oldBoard.responsible = b.responsible
        oldBoard.sprint = b.sprint
        oldBoard.status = b.status
      }
    })

    if (board.status == oldBoard.status) {
      boardsDataNew?.map((b) => {
        if (b.id == board.id) {
          b.title = board.title
          b.timeEstimated = board.timeEstimated
          b.description = board.description
          b.author = board.author
          b.responsible = board.responsible
          b.sprint = board.sprint
          b.status = board.status
        }
      })
      setBoardsData(boardsDataNew)
      setOpenModalBoard(false)
      return
    }
    // ver se tem board na coluna de destino
    const boardsDestination = boardsDataNew?.filter(
      (b) => b.status == board.status
    )

    // se nao tiver, so atualiza
    if (!boardsDestination?.length) {
      boardsDataNew?.map((b) => {
        if (b.id == board.id) {
          b.status = board.status
        }
      })
    } else {
      const boardData: Board = {
        id: '',
        title: '',
        timeEstimated: 1,
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
      }

      boardsDataNew = boardsDataNew?.filter((b) => {
        if (b.id != board.id) {
          return b
        } else {
          boardData.id = b.id
          boardData.title = b.title
          boardData.timeEstimated = b.timeEstimated
          boardData.description = b.description
          boardData.author = b.author
          boardData.responsible = b.responsible
          boardData.sprint = b.sprint
          boardData.status = board.status
        }
      })

      const indexBoardDestination = boardsDataNew?.findIndex(
        (b) => b.id == boardsDestination[0].id
      )

      if (indexBoardDestination == 0) {
        boardsDataNew = boardsDataNew && [board].concat(boardsDataNew)
      } else {
        indexBoardDestination &&
          boardsDataNew?.splice(indexBoardDestination, 0, board)
      }
    }

    const boardsIds = boardsDataNew?.map((b) => b.id)
    const { errors } = await updateSprintGraphQL({
      variables: {
        id: activeSprintData.sprint.id,
        boardsIds: boardsIds
      }
    })

    if (errors) {
      setBoardsData(boardsDataOld)
    }
    setBoardsData(boardsDataNew)
    setOpenModalBoard(false)
  }
  const modalBoardPropsDefault = {
    permited: userRole != 'member',
    session: session,
    initialBoard: {
      id: '',
      title: '',
      timeEstimated: 1,
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
      status: 'notInitiated'
    },
    options: 'create',
    activeProject: activeProject,
    usersOptions: [{ label: '', value: '' }],
    pathOptions: [{ label: '', value: '' }],
    closeModal: () => setOpenModalBoard(false),
    user: user,
    refreshBoardForm: refreshBoardForm
  }

  const [propsModalBoard, setPropsModalBoard] = useState<FormBoardProps>(
    modalBoardPropsDefault
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
          activeProject.id
        )
        setPropsModalBoard(modalBoardPropsNew)
      }
    })

  const [getBoardGraphql, { data: dataQueryBoard }] = useLazyQuery<QueryBoard>(
    QUERY_BOARD,
    {
      context: { session },
      onCompleted: () => {
        const modalBoardPropsNew = propsModalBoard
        modalBoardPropsNew.option = 'edit'
        modalBoardPropsNew.initialBoard = {
          id: dataQueryBoard?.board?.data?.id || '',
          createdDate: dataQueryBoard?.board?.data?.attributes?.createdAt,
          conclusionDate:
            dataQueryBoard?.board?.data?.attributes?.conclusionDate,
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

  const editBoard = async (id: string) => {
    setPropsModalBoard(modalBoardPropsDefault)
    await getAllUsersInProject({
      variables: {
        projectId: activeProject.id
      },
      fetchPolicy: 'no-cache'
    })
    await getAllSprintInProject({
      variables: {
        projectId: activeProject.id
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

  const [getSprint, { data: sprintQueryData }] =
    useLazyQuery<QuerySprintBoards>(QUERY_SPRINT_BOARDS, {
      context: { session },
      onCompleted: () => {
        const boardsQuery: Board[] | undefined =
          sprintQueryData?.sprint?.data?.attributes?.boards?.data?.map((b) => ({
            id: b.id || '',
            title: b.attributes?.title || '',
            timeEstimated: b.attributes?.timeEstimated || 0,
            description: b.attributes?.description || '',
            author: {
              id: b.attributes?.author?.data?.id || '',
              name: b.attributes?.author?.data?.attributes?.username || ''
            },
            responsible: {
              id: b.attributes?.responsible?.data?.id || '',
              name: b.attributes?.responsible?.data?.attributes?.username || ''
            },
            sprint: b.attributes?.sprint?.data?.id || '',
            status: b.attributes?.status || ''
          }))

        boardsQuery && setBoardsData(boardsQuery)
        // boardsQuery &&
        //   setBoardsNotInitiated(
        //     boardsQuery?.filter((b) => b.status == 'notInitiated')
        //   )

        // boardsQuery &&
        //   setBoardsInProgress(boardsQuery?.filter((b) => b.status == 'inProgress'))

        // boardsQuery &&
        //   setBoardsConcluded(boardsQuery?.filter((b) => b.status == 'concluded'))
      }
    })

  const boardsNotInitiated = boardsData?.filter(
    (b) => b.status == 'notInitiated'
  )
  const boardsInProgress = boardsData?.filter((b) => b.status == 'inProgress')
  const boardsConcluded = boardsData?.filter((b) => b.status == 'concluded')

  const [updateBoardGraphQL] = useMutation(MUTATION_UPDATE_BOARD, {
    context: { session },
    onCompleted: (data) => {
      //
    }
  })

  const [updateSprintGraphQL] = useMutation(MUTATION_UPDATE_BOARDS, {
    context: { session },
    onCompleted: (data) => {
      //
    }
  })

  const onDragEnd = async (result: DropResult) => {
    //
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

    const sourceStatus = result.source?.droppableId.replace('status-', '')

    const destinationStatus = result.destination?.droppableId.replace(
      'status-',
      ''
    )

    const boardId = result.draggableId.replace('draggable-', '')

    const boardsDataOld = boardsData?.slice()
    let boardsDataNew = boardsData?.slice()

    // ver se tem board na coluna de destino
    const boardsDestination = boardsDataNew?.filter(
      (b) => b.status == destinationStatus && b.id != boardId
    )

    // se nao tiver, so atualiza
    if (!boardsDestination?.length) {
      boardsDataNew?.map((b) => {
        if (b.id == boardId) {
          b.status = destinationStatus
        }
      })
    } else {
      const board: Board = {
        id: '',
        title: '',
        timeEstimated: 1,
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
      }

      boardsDataNew = boardsDataNew?.filter((b) => {
        if (b.id != boardId) {
          return b
        } else {
          board.id = b.id
          board.title = b.title
          board.timeEstimated = b.timeEstimated
          board.description = b.description
          board.author = b.author
          board.responsible = b.responsible
          board.sprint = b.sprint
          board.status = destinationStatus
        }
      })

      if (destination.index != boardsDestination?.length) {
        const indexBoardDestination = boardsDataNew?.findIndex(
          (b) => b.id == boardsDestination[destination.index].id
        )

        if (indexBoardDestination == 0) {
          boardsDataNew = boardsDataNew && [board].concat(boardsDataNew)
        } else {
          indexBoardDestination &&
            boardsDataNew?.splice(indexBoardDestination, 0, board)
        }
      } else {
        boardsDataNew?.push(board)
      }
    }

    setBoardsData(boardsDataNew)
    const boardsIds = boardsDataNew?.map((b) => b.id)
    const { errors } = await updateBoardGraphQL({
      variables: {
        boardId: boardId,
        status: destinationStatus
      }
    })

    const { errors: errorsBoardsIdUpdate } = await updateSprintGraphQL({
      variables: {
        id: activeSprintData.sprint.id,
        boardsIds: boardsIds
      }
    })

    if (errors || errorsBoardsIdUpdate) {
      setBoardsData(boardsDataOld)
    }
  }

  const [createActiveSprint] = useMutation(MUTATION_CREATE_ACTIVE_SPRINT, {
    context: { session },
    onCompleted: (data) => {
      setActiveSprintData({
        id: data.createActiveSprint.data.id,
        sprint: {
          id: data.createActiveSprint.data.attributes.sprint.data.id,
          name: data.createActiveSprint.data.attributes.sprint.data.attributes
            .name
        }
      })
    }
  })

  const [updateActiveSprint] = useMutation(MUTATION_UPDATE_ACTIVE_SPRINT, {
    context: { session },
    onCompleted: (data) => {
      setActiveSprintData({
        id: data.updateActiveSprint.data.id,
        sprint: {
          id: data.updateActiveSprint.data.attributes.sprint.data.id,
          name: data.updateActiveSprint.data.attributes.sprint.data.attributes
            .name
        }
      })
    }
  })

  const setActiveSprint = async (option: any) => {
    activeSprintData
      ? await updateActiveSprint({
          variables: {
            activeSprintId: activeSprintData.id,
            sprintId: option.value
          }
        })
      : await createActiveSprint({
          variables: {
            projectId: activeProject.id,
            sprintId: option.value,
            userId: user.id
          }
        })
    getSprint({
      variables: {
        id: option.value
      },
      fetchPolicy: 'no-cache'
    })
  }

  const [deleteBoardGraphQL] = useMutation(MUTATION_DELETE_BOARD, {
    context: { session },
    onCompleted: (data) => {
      let boardsDataNew = boardsData?.slice()
      boardsDataNew = boardsDataNew?.filter(
        (b) => b.id != data.deleteBoard.data.id
      )
      setBoardsData(boardsDataNew)
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
        open={openModalBoard}
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
      >
        <FormBoard {...propsModalBoard} />
      </Dialog>

      <Base
        projectsQuantity={projectUserRoles?.length}
        activeProject={activeProject}
      >
        <Container>
          <Heading lineLeft lineColor="secondary" color="black">
            Painel - {activeProject.name}
          </Heading>

          <S.Main>
            <S.Content>
              {activeProject ? (
                <>
                  <S.Select>
                    <SelectComponent
                      isSearchable={true}
                      // SingleValue={SingleValue}
                      defaultOption={
                        activeSprintData
                          ? {
                              label: activeSprintData.sprint.name || '',
                              value: activeSprintData.sprint.id || ''
                            }
                          : undefined
                      }
                      placeholder="Selecione um sprint"
                      customStyle={colourStylesStatus}
                      label="Sprint"
                      noOptionsMessage="Não existem sprints"
                      options={sprintsSelect}
                      setData={setActiveSprint}
                      isDisabled={!true}
                    />
                  </S.Select>
                  <S.StatusContainer>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Status
                        deleteBoard={removeBoardSelect}
                        statusType="notInitiated"
                        boards={boardsNotInitiated}
                        permited={userRole != 'member'}
                        editBoard={editBoard}
                        user={user}
                      />
                      <Status
                        deleteBoard={removeBoardSelect}
                        statusType="inProgress"
                        boards={boardsInProgress}
                        permited={userRole != 'member'}
                        editBoard={editBoard}
                        user={user}
                      />
                      <Status
                        deleteBoard={removeBoardSelect}
                        statusType="concluded"
                        boards={boardsConcluded}
                        permited={userRole != 'member'}
                        editBoard={editBoard}
                        user={user}
                      />
                    </DragDropContext>
                  </S.StatusContainer>
                </>
              ) : (
                <WithoutProject />
              )}
            </S.Content>
          </S.Main>
        </Container>
      </Base>
    </>
  )
}

export default Panel
