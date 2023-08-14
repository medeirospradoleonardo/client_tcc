import * as React from 'react'
import * as S from './styles'

import { Draggable, Droppable } from 'react-beautiful-dnd'
import Item from './item'
import { Sprint } from 'templates/ProductBacklog'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from 'components/TextField'
import Heading from 'components/Heading'

// const Container = styled.div`
//   margin: ${grid}px;
//   display: flex;
//   flex-direction: column;
// `

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-top-left-radius: ${borderRadius}px;
//   border-top-right-radius: ${borderRadius}px;
//   background-color: ${({ isDragging }) =>
//     isDragging ? colors.G50 : colors.N30};
//   transition: background-color 0.2s ease;
//   &:hover {
//     background-color: ${colors.G50};
//   }
// `

// export type User = {
//   id: string
//   name: string
// }

// type Board = {
//   id: string
//   title: string
//   timeEstimated: number
//   description: string
//   author: User
//   responsible: User
//   status: 'Não iniciado' | 'Em progresso' | 'Concluído'
// }

// export type Sprint = {
//   id: string
//   name: string | undefined
//   initialDate: Date
//   finalDate: Date
//   boards: Board[]
// }

export type SprintProps = {
  sprint: Sprint
  openModal: () => void
  deleteSprint: (id: string) => void
}

export default function SprintComponent({
  sprint,
  openModal,
  deleteSprint
}: SprintProps) {
  return (
    <>
      <Droppable droppableId={sprint.name || ''}>
        {(provided) => (
          <S.ContainerSprint>
            <S.ContainerHeader>
              <S.ContainerTitle>
                {/* <S.Title>{sprint.name}</S.Title> */}
                <S.Title>
                  <Heading size="medium" color="black" lineBottom>
                    {sprint.name}
                  </Heading>
                </S.Title>
              </S.ContainerTitle>
              <S.ContainerDate>
                <h4>{sprint.initialDate}</h4>
                <h4>{sprint.finalDate}</h4>
              </S.ContainerDate>
              <div>
                <IconButton>
                  <EditIcon style={{ color: '#030517' }} fontSize="large" />
                </IconButton>
              </div>
              <div>
                <IconButton onClick={() => deleteSprint(sprint.id)}>
                  <DeleteIcon style={{ color: '#030517' }} fontSize="large" />
                </IconButton>
              </div>
            </S.ContainerHeader>

            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sprint.boards &&
                sprint.boards.map((board) => (
                  <Item
                    openModal={openModal}
                    key={board.id}
                    title={board.title}
                    timeEstimated={board.timeEstimated}
                    responsible={board.responsible.name}
                    status={board.status}
                    index={parseInt(board.id)}
                  />
                ))}

              {provided.placeholder}
            </div>
          </S.ContainerSprint>
        )}
      </Droppable>
    </>
  )
}
