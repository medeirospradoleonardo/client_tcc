import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface ItemProps {
  title: string
  timeEstimated: number
  status: string
  responsible: string
  index: number
  openModal: () => void
}

const StyledItem = styled.div`
  background-color: '#6e6e6e';
  border-radius: 4;
  padding: '4px 8px';
  transition: 'background-color .8s ease-out';
  margin-top: 8;

  &:hover {
    background-color: '#a31818';
    transition: 'background-color .1s ease-in';
  }
`

const Item: React.FC<ItemProps> = ({
  title,
  timeEstimated,
  status,
  responsible,
  index,
  openModal
}) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={openModal}
        >
          {title}
          {timeEstimated}
          {status}
          {responsible}
        </StyledItem>
      )}
    </Draggable>
  )
}

export default Item
