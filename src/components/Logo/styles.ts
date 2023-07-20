import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import { LogoProps } from '.'

export const Wrapper = styled.div<LogoProps>`
  ${({ theme, color }) => css`
    color: ${theme.colors[color!]};
    height: 100%;
  `}
`
