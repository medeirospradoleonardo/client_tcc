import styled, { css, DefaultTheme } from 'styled-components'

export const Heading = styled.div`
  margin-left: 10px;
  margin-top: 5px;
`

export const Content = styled.div``

export const ContainerSprint = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.lightGray};
    width: 600px;
    border: 1px solid;
    margin-bottom: 10px;
  `}
`

export const ContainerHeader = styled.div`
  display: flex;
  border: 1px solid;
  border-color: black;
`

export const ContainerTitle = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  /* margin-top: 20px; */
  display: flex;
`

export const ContainerDate = styled.div`
  display: flex;
  margin-top: 40px;
  margin-left: 20px;
`

export const Title = styled.div`
  /* margin-top: 5px;
  margin-left: 10px; */
`

export const ContentSprint = styled.div``

export const ContentBacklog = styled.div``
