import styled, { css } from 'styled-components'

export const Heading = styled.div`
  margin-left: 10px;
  margin-top: 5px;
  z-index: 1;
`

export const Content = styled.div`
  margin-top: 10px;
`

export const ContainerStatus = styled.div`
  ${({ theme }) => css`
    padding: 5px;
    box-sizing: border-box;
    background: white;
    background: ${theme.colors.lightGray};
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    border-bottom: 1px solid rgb(178, 185, 197);
    margin-right: 20px;
  `}
`

export const ContainerHeader = styled.header`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(178, 185, 197);
`

export const ContainerTitle = styled.div`
  margin-left: 10px;
  /* margin-top: 20px; */
  display: flex;
`

export const Title = styled.div`
  margin-bottom: -10px;
`
