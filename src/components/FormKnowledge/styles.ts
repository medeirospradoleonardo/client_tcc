import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Heading = styled.div`
  margin-top: 10px;
`

export const Footer = styled.div`
  display: flex;
  margin-top: 80px;
`

export const Content = styled.div``

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
