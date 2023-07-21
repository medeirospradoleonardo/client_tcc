import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Main = styled.main`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.medium};

    ${media.greaterThan('medium')`
        /* display: grid; */
        /* grid-template-columns: 32rem 1fr; */
        /* gap: calc(${theme.grid.gutter} * 2); */
    `}
    box-shadow: 8px 12px 24px 12px rgba(0, 0, 0, 0.1);
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: ${theme.spacings.xsmall};
  `}
`
