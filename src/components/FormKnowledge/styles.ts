import styled, { css } from 'styled-components'

export const Heading = styled.div`
  margin-top: auto;
`

export const Content = styled.div`
  display: flex;
  height: 88%;
  flex-direction: column;
`

export const ButtonsHeading = styled.div`
  display: flex;
`

export const Left = styled.div`
  margin-right: auto;
`

export const Right = styled.div`
  margin-left: auto;
`

export const CreateBy = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray};
  `}
`

export const Footer = styled.div`
  display: flex;
  margin-top: 10px;
`
