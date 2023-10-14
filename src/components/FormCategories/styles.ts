import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Heading = styled.div`
  margin-top: 10px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 170px;

  ${media.greaterThan('medium')`
      grid-column: 2;
  `}
`

export const Info = styled.span`
  ${({ theme }) => css`
    font-size: 12px;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.gray};
    margin-bottom: 10px;
  `}
`

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 10px;
`

export const Content = styled.div`
  /* height: 300px; */
`
