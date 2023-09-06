import styled, { css } from 'styled-components'

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    cursor: pointer;
  `}
`
export const Container = styled.div`
  ${({ theme }) => css`
    width: 491px;
    height: 20px;
    border: 1px solid rgb(178, 185, 197);
  `}
`
