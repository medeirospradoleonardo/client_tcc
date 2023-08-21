import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`

export const Content = styled.div`
  /* ${({ theme }) => css`
    margin-top: ${theme.spacings.large};
    flex: 1 0 auto;
  `} */
  /* overflow: -moz-scrollbars-vertical; */
  /* overflow-y: scroll; */
  margin-top: 50px;
`

export const Menu = styled.div`
  position: fixed;
  width: 100%;
  z-index: 3;
`

export const Sidebar = styled.div`
  z-index: 2;
`

export const SectionFooter = styled.section`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.large};
    padding-bottom: ${theme.spacings.xsmall};
    padding-top: ${theme.spacings.xxlarge};
    background-color: ${theme.colors.white};
    clip-path: polygon(0 5%, 100% 0%, 100% 100%, 0 100%);
    ${media.greaterThan('medium')`
      padding-top: calc(${theme.spacings.xxlarge} * 2);
      clip-path: polygon(0 15%, 100% 0%, 100% 100%, 0 100%);
    `}
  `}
`
export const SLayout = styled.div`
  display: flex;
`

export const SMain = styled.main`
  padding: calc(8 * 2);
  flex: min-content;
  margin-left: 300px;
  margin-top: 300px;
  ${({ theme }) => css`
    margin-top: ${theme.spacings.large};
  `}

  h1 {
    font-size: 14px;
  }
`
