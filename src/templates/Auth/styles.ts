import styled, { css } from 'styled-components'

import * as HeadingStyles from 'components/Heading/styles'
import * as LogoStyles from 'components/Logo/styles'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  display: flex;
  /* height: 100vh; */
  height: 60rem;
  justify-content: center;
`

export const Footer = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    text-align: center;
    align-self: end;
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    box-shadow: 8px 12px 24px 12px rgba(0, 0, 0, 0.1);
    background: ${theme.colors.white};
    align-items: center;
    justify-content: center;
    padding: 2rem 2rem;
  `}
`

export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    /* width: 36rem; */
    padding-top: 5rem;
    align-items: center;
    justify-content: center;
    justify-self: center;

    ${media.greaterThan('medium')`
        width: 38rem;
    `}

    ${LogoStyles.Wrapper} {
      margin: 0 auto ${theme.spacings.xxlarge};
    }

    ${HeadingStyles.Wrapper} {
      margin-bottom: ${theme.spacings.medium};
    }
  `}
`
