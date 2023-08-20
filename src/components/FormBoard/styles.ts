import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Heading = styled.div`
  margin-top: 10px;
`

export const Select = styled.div``

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 80px;

  ${media.greaterThan('medium')`
      grid-column: 2;
  `}
`

export const ButtonContainerFirstForm = styled.div`
  display: flex;
  justify-content: flex-end;

  ${media.greaterThan('medium')`
      grid-column: 2;
  `}
`

export const Content = styled.div`
  display: flex;
`

export const Right = styled.div`
  margin-left: auto;
  display: flex;
`
