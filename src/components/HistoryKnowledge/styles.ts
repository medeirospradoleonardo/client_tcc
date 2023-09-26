import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Heading = styled.div`
  margin-top: 10px;
  display: flex;
`

export const Left = styled.div`
  margin-right: auto;
`

export const Right = styled.div`
  margin-left: auto;
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

export const Content = styled.div`
  /* max-height: 450px; */
  padding-bottom: 10px;
`

export const ContainerStory = styled.div`
  ${({ theme }) => css`
    padding: 5px;
    box-sizing: border-box;
    background: white;
    background: ${theme.colors.lightGray};
    /* width: 600px; */
    margin-bottom: 10px;
    border-radius: 5px;
    border-bottom: 1px solid rgb(178, 185, 197);
  `}
`

export const Date = styled.div``

export const Author = styled.div``
