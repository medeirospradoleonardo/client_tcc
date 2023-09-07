import * as React from 'react'
import * as S from './styles'
import Heading from 'components/Heading'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Board, User } from 'templates/ProductBacklog'

import { getBoardStatus } from 'utils/mappers'
import Item from 'components/Item'

export type StatusProps = {
  statusType: 'notInitiated' | 'inProgress' | 'concluded'
  boards: Board[] | undefined
  permited: boolean
  deleteBoard: (id: string) => void
  editBoard: (id: string) => void
  user: User
}

export default function Status({
  statusType,
  boards,
  permited,
  deleteBoard,
  editBoard,
  user
}: StatusProps) {
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: 'white',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    borderBottom: '1px solid rgb(178,185,197)',

    ...draggableStyle
  })

  return (
    <>
      <S.ContainerStatus>
        <S.ContainerHeader>
          <S.ContainerTitle>
            <S.Title>
              <Heading size="medium" color="black" lineBottom>
                {getBoardStatus(statusType).title}
              </Heading>
            </S.Title>
          </S.ContainerTitle>
        </S.ContainerHeader>

        <Droppable droppableId={`status-${statusType}`}>
          {(provided) => (
            <S.Content>
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {boards &&
                  boards.map((board: Board, index: number) => (
                    <Draggable
                      key={board.id}
                      index={index}
                      draggableId={`draggable-${board.id}`}
                      isDragDisabled={!permited}
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
                          onClick={
                            permited
                              ? () => editBoard(board.id)
                              : user.id == board.responsible.id
                              ? () => editBoard(board.id)
                              : undefined
                          }
                        >
                          <Item
                            permited={permited}
                            deleteBoard={deleteBoard}
                            key={board.id}
                            id={board.id}
                            title={board.title}
                            timeEstimated={board.timeEstimated}
                            responsible={board.responsible.name}
                            status={board.status}
                            onPanel={true}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                {provided.placeholder}
              </div>
            </S.Content>
          )}
        </Droppable>
      </S.ContainerStatus>
    </>
  )
}
