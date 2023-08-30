import styled, { css } from 'styled-components'

type IdProps = {
  concluded: boolean
}

export const wrapperModifiers = {
  lineThrough: () => css`
    text-decoration: line-through;
  `
}

export const Id = styled.div<IdProps>`
  ${({ concluded }) => css`
    ${concluded && wrapperModifiers.lineThrough()}
  `}
  margin-right: 7px;
  text-decoration-style: double;
`
export const Title = styled.div`
  max-width: 200px;
  max-height: 40px;
`
export const Container = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  user-select: none;
`

export const Left = styled.div`
  display: flex;
`

export const Right = styled.div`
  margin-left: auto;
  display: flex;
`

export const TimeEstimated = styled.div`
  margin-right: 10px;
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
        width: 228px;
        top: 20px;
        position: absolute;
        text-decoration: none;
      }
    }

    .title {
      display: none;
      background: #000;
    }
    .timeEstimated {
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 100%;
      text-transform: uppercase;
      color: #fff;
      background: ${theme.colors.gray};
      .timeEstimatedSpan {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    }
  `}
`

export const Status = styled.div`
  color: #fff;
  background: ${(props) => props.color};
  padding-left: 4px;
  padding-right: 4px;
  height: 25px;
  width: auto;
  margin-right: 10px;

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
        right: 30px;
        margin: 10px;
        width: 54px;
        top: 20px;
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
