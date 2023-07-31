import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Form = styled.form`
  ${({ theme }) => css`
    max-width: 100%;
    display: grid;
    gap: ${theme.spacings.xsmall};

    > button {
      margin-top: ${theme.spacings.xxlarge};
    }
    ${media.greaterThan('medium')`
      grid-template-columns: 1fr 1fr;
      gap: ${theme.spacings.medium};
      > button {
        grid-column: 2;
        justify-self: end;
        margin-top: 0;
      }
    `}
  `}
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  ${media.greaterThan('medium')`
      grid-column: 2;
  `}
`

export const Content = styled.div`
  /* display: flex; */
  /* padding: 0 30px 60px; */
`

export const Left = styled.div`
  width: 65%;
  padding-right: 50px;
`

export const Right = styled.div`
  width: 35%;
  padding-top: 5px;
`
