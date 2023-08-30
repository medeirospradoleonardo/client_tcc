import styled, { css } from 'styled-components'

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    cursor: pointer;
  `}
`

export const Avatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  text-transform: none;
  color: #000;
  background: ${(props) => props.color};

  & > span {
    text-transform: uppercase;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`

export const Right = styled.div`
  display: flex;
`
