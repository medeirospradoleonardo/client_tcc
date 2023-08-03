import styled from 'styled-components'
import media from 'styled-media-query'

export const Heading = styled.div`
  margin-top: 10px;
`

export const Select = styled.div`
  /* margin-top: 50px; */

  ${media.greaterThan('medium')`
      grid-column: 2;
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
  /* height: 450px; */
`
