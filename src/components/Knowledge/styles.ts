import styled, { css } from 'styled-components'

export const Title = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`

export const Container = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    background: ${theme.colors.lightGray};
    display: flex;
    justify-content: space-between;
    user-select: none;
    width: 250px;
  `}
`

export const Left = styled.div`
  display: flex;
`

export const Right = styled.div`
  margin-left: auto;
  display: flex;
  margin-top: 20px;
  margin-bottom: 5px;
`
export const Icon = styled.div`
  margin-top: -6px;
  margin-bottom: -10px;
`

export const AvatarContainer = styled.div`
  ${({ theme }) => css`
    &:hover {
      position: relative;
      transform: translateY(-5px);

      .title {
        border: #c0c0c0 1px;
        padding: 5px 20px 5px 5px;
        display: inline-block;
        z-index: 100;
        font-size: 14px;
        text-transform: none;
        background: ${theme.colors.darkGray};
        border-radius: 5px;
        border-bottom: 1px solid rgb(178, 185, 197);
        right: -130px;
        margin: 10px;
        width: 250px;
        position: absolute;
        text-decoration: none;
      }
    }

    .title {
      display: none;
      background: #000;
    }
  `}
`

export const Avatar = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  text-transform: uppercase;
  color: #fff;
  background: ${(props) => props.color};
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`
