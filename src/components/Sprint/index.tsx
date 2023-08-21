import * as React from 'react'
import * as S from './styles'

import { Draggable, Droppable } from 'react-beautiful-dnd'
import Item from 'components/Item'
import { Board, Sprint } from 'templates/ProductBacklog'
import { Dialog, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import TextField from 'components/TextField'
import Heading from 'components/Heading'
import Button from 'components/Button'
import Confirm from 'components/Confirm'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { MUTATION_SPRINT_TOGGLE_EXPAND } from 'graphql/mutations/sprint'
import { Session } from 'next-auth'

export type SprintProps = {
  session: Session
  sprint: Sprint
  openBoardModal: () => void
  deleteSprint: (id: string) => void
  deleteBoard: (id: string) => void
  editSprint: (id: string) => void
}

export default function SprintComponent({
  session,
  sprint,
  openBoardModal,
  deleteSprint,
  deleteBoard,
  editSprint
}: SprintProps) {
  const [expandSprint, setExpandSprint] = useState<boolean>(sprint.expand)

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: 'white',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    borderBottom: '1px solid rgb(178,185,197)',

    ...draggableStyle
  })

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  function formatDate(date: Date) {
    return [
      padTo2Digits(date.getDate() + 1),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join('/')
  }

  const [toggleSprintExpandGraphQL] = useMutation(
    MUTATION_SPRINT_TOGGLE_EXPAND,
    {
      context: { session },
      onCompleted: () => {
        setExpandSprint(!expandSprint)
      }
    }
  )

  const toggleSprintExpand = (id: string) => {
    toggleSprintExpandGraphQL({
      variables: {
        id: id,
        expand: !expandSprint
      }
    })
  }

  return (
    <>
      <Droppable droppableId={sprint.name || ''}>
        {(provided) => (
          <S.ContainerSprint ref={provided.innerRef}>
            <S.ContainerHeader>
              <IconButton onClick={() => toggleSprintExpand(sprint.id)}>
                {expandSprint ? (
                  <KeyboardArrowDownOutlinedIcon
                    style={{ color: '#030517' }}
                    fontSize="large"
                  />
                ) : (
                  <KeyboardArrowRightOutlinedIcon
                    style={{ color: '#030517' }}
                    fontSize="large"
                  />
                )}
              </IconButton>
              <S.ContainerTitle>
                <S.Title>
                  <Heading size="medium" color="black" lineBottom>
                    {sprint.name}
                  </Heading>
                </S.Title>
              </S.ContainerTitle>
              <S.ContainerDate>
                <h4>{formatDate(new Date(sprint.initialDate))}</h4>
                <ArrowRightAltOutlinedIcon style={{ marginTop: '5px' }} />
                <h4>{formatDate(new Date(sprint.finalDate))}</h4>
              </S.ContainerDate>
              <S.Right>
                <div>
                  <IconButton onClick={() => editSprint(sprint.id)}>
                    <EditIcon style={{ color: '#030517' }} fontSize="large" />
                  </IconButton>
                </div>

                <div>
                  <IconButton onClick={() => deleteSprint(sprint.id)}>
                    <DeleteIcon style={{ color: '#030517' }} fontSize="large" />
                  </IconButton>
                </div>
              </S.Right>
            </S.ContainerHeader>
            {expandSprint && (
              <S.Content>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {sprint.boards &&
                    sprint.boards.map((board: Board, index: number) => (
                      <Draggable
                        key={board.id}
                        index={index}
                        draggableId={`draggable-${board.id}`}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            onClick={openBoardModal}
                          >
                            <Item
                              deleteBoard={deleteBoard}
                              key={board.id}
                              id={board.id}
                              title={board.title}
                              timeEstimated={board.timeEstimated}
                              responsible={board.responsible.name}
                              status={board.status}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
                <Button
                  style={{ color: '#000' }}
                  icon={<AddIcon />}
                  minimal
                  size="small"
                  onClick={openBoardModal}
                >
                  Criar item
                </Button>
              </S.Content>
            )}
          </S.ContainerSprint>
        )}
      </Droppable>
    </>
  )
}
