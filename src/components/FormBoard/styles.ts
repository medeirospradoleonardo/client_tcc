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
  height: 300px;
`

export const Left = styled.div`
  margin-right: 15px;
  width: 100%;
`

export const Right = styled.div`
  margin-left: auto;
  display: flex;
  width: 360px;
`

export const Dates = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.gray};
    /* margin-top: 10px; */
    /* margin-top: 50px; */
    margin-top: 68px;
    /* margin-left: 149px; */
  `}
`

export const Description = styled.div`
  ${({ theme }) => css``}
`
