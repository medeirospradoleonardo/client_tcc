import * as React from 'react'
import * as S from './styles'

import { Draggable, Droppable } from 'react-beautiful-dnd'
import Item from 'components/Item'
import { Board } from 'templates/ProductBacklog'

import AddIcon from '@mui/icons-material/Add'

import Heading from 'components/Heading'
import Button from 'components/Button'

import { Project } from 'templates/Projects'

export type ProductBacklogComponentProps = {
  project: Project
  deleteBoard: (id: string) => void
  openBoardModal: () => void
}

export default function ProductBacklogComponent({
  project,
  deleteBoard,
  openBoardModal
}: ProductBacklogComponentProps) {
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: 'white',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    borderBottom: '1px solid rgb(178,185,197)',

    ...draggableStyle
  })

  project.boards = project.boards?.filter((b) => b.sprint == null)

  return (
    <>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>
            <S.Title>
              <Heading size="medium" color="black" lineBottom>
                Backlog do produto
              </Heading>
            </S.Title>
          </S.ContainerTitle>
        </S.ContainerHeader>
        <S.Content>
          <Droppable droppableId={`productBacklog-${project.id}`}>
            {(provided) => (
              <>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {project.boards &&
                    project.boards.map((board: Board, index: number) => (
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
              </>
            )}
          </Droppable>
        </S.Content>
      </S.Container>
    </>
  )
}
