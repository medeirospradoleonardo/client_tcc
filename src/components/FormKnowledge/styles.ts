import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Heading = styled.div`
  margin-top: 10px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 80px;

  ${media.greaterThan('medium')`
      grid-column: 2;
  `}
`

export const Content = styled.div``
