import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Heading = styled.div`
  margin-top: 10px;
`

export const DateContainer = styled.div`
  display: flex;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;

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

export const Content = styled.div``
