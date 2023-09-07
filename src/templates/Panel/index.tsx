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
import { QUERY_SPRINT_BOARDS } from 'graphql/queries/sprint'
import { useLazyQuery, useMutation } from '@apollo/client'
import { QuerySprintBoards } from 'graphql/generated/QuerySprintBoards'
import { Session } from 'next-auth'
import {
  MUTATION_CREATE_ACTIVE_SPRINT,
  MUTATION_UPDATE_ACTIVE_SPRINT
} from 'graphql/mutations/activeSprint'
import { MUTATION_DELETE_BOARD } from 'graphql/mutations/board'
import Confirm from 'components/Confirm'
import { Dialog } from '@mui/material'

type ActiveSprintType = {
  id: string
  sprint: {
    id: string
    name: string
  }
}

export type PanelTemplateProps = {
  session: Session
  user: User
  projectUserRoles: ProjectsTemplateProps[]
  activeProject: Project
  activeSprint: ActiveSprintType
  sprintsSelect: OptionType[]
  boards?: Board[]
}

const Panel = ({
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

  const [openModalDeleteBoard, setOpenModalDeleteBoard] = useState(false)
  const [boardToRemoveId, setBoardToRemoveId] = useState<string>()

  const [activeSprintData, setActiveSprintData] =
    useState<ActiveSprintType>(activeSprint)
  const [boardsData, setBoardsData] = useState<Board[] | undefined>(boards)

  const handleClose = (event: React.MouseEventHandler, reason: string) => {
    if (reason && reason == 'backdropClick') return

    setOpenModalDeleteBoard(false)
  }

  const removeBoardSelect = (id: string) => {
    setOpenModalDeleteBoard(true)
    setBoardToRemoveId(id)
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

  const onDragEnd = async (result: DropResult) => {
    //
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
      }
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
      <Base
        projectsQuantity={projectUserRoles?.length}
        activeProject={activeProject}
      >
        <Container>
          <Heading lineLeft lineColor="secondary" color="black">
            Painel
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
                        permited={true}
                      />
                      <Status
                        deleteBoard={removeBoardSelect}
                        statusType="inProgress"
                        boards={boardsInProgress}
                        permited={true}
                      />
                      <Status
                        deleteBoard={removeBoardSelect}
                        statusType="concluded"
                        boards={boardsConcluded}
                        permited={true}
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
