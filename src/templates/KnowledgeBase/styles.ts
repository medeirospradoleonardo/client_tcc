import ReactPaginate from 'react-paginate'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

export const Main = styled.main`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.medium};
    box-shadow: 8px 12px 24px 12px rgba(0, 0, 0, 0.1);
  `}
`
export const Heading = styled.div`
  display: flex;
  margin-bottom: 10px;
`
export const Body = styled.div`
  display: flex;
  flex-direction: column;
`
export const Container = styled.div`
  display: flex;
  height: 100%;
`
export const Items = styled.div`
  ${({ theme }) => css`
    & > div:not(:last-of-type) {
      margin-bottom: ${theme.spacings.xsmall};
    }
    & + div {
      border-top: 0.1rem solid ${rgba(theme.colors.gray, 0.2)};
      margin-top: ${theme.spacings.small};
      padding-top: ${theme.spacings.xsmall};
    }
  `}
`

export const Filters = styled.div`
  width: 20rem;
  padding-right: 10px;
`

export const Grid = styled.div`
  height: 100%;
  width: 100%;
`
export const Search = styled.div`
  width: 70rem;
`

export const Content = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: ${theme.spacings.xsmall};
    /* height: 734px; */
    height: 100%;
  `}
`
export const Knowledges = styled.div`
  ${({ theme }) => css`
    margin-top: 20px;
  `}
`

export const Footer = styled.div`
  margin-top: auto;
  display: flex;
`

export const Right = styled.div`
  margin-left: auto;
`

export const StyledReactPaginate = styled(ReactPaginate)`
  /* layout */

  align-items: center;
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: center;
  list-style-type: none;
  position: relative;

  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 15px;
  }

  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .col {
    flex: 1;
    padding: 15px;
  }

  .row > .col:first-child {
    border-right: 1px solid #ccc;
    max-width: 400px;
  }

  .row > .col:last-child {
    background: #fafafa;
  }

  .flex {
    display: flex;
  }

  .wrap {
    flex-wrap: wrap;
  }

  .column {
    flex-direction: column;
  }

  .align-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-space-between {
    justify-content: space-between;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  @media all and (max-width: 767px) {
    .row {
      flex-direction: column;
    }

    .row > .col:first-child {
      border-right: none;
      max-width: none;
    }
  }

  /* apps */

  .authors-list {
    color: #9d9d9d;
    font-weight: bold;
  }

  .ratings-list {
    padding: 10px 0;
  }

  .avg-rating {
    color: #6b6b6b;
  }

  .stars {
    color: gold;
  }

  .location {
    color: salmon;
    margin-right: 5px;
  }

  .meetup-location {
    margin: 4px 0;
  }

  .book-title {
    white-space: normal;
    margin-top: 4px;
  }

  .book-title-card {
    white-space: normal;
    margin-top: 4px;
    max-height: 45px;
  }

  .book-image {
    height: 150px;
    width: 110px;
    background-size: cover;
  }

  .book-header {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .book-content {
    background: white;
    margin: 10px 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .meetup-title {
    white-space: normal;
  }

  .meetup-topics {
    height: 35px;
    overflow: hidden;
  }

  .meetup-topic {
    background-color: #dedede;
    color: #555;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 4px;
  }

  .meetup-topic:first-child {
    margin-left: 0;
  }

  .col .meetup-list-image {
    background-size: cover;
  }

  .list-item {
    display: flex;
    height: 30px;
    height: 30px;
    align-items: center;
  }

  .list-item-label {
    margin-left: 10px;
    height: 30px;
    line-height: 2;
  }

  .page-link {
    ${({ theme }) => css`
      color: ${theme.colors.primary};
      position: relative;
      display: block;
      padding: 0.5rem 0.75rem;
      margin-left: -1px;
      line-height: 1.25;
      background-color: #fff;
      border: 1px solid #dee2e6;
    `}
  }

  .page-link:hover {
    cursor: pointer;
    background-color: #e6e6e6;
  }

  li.page-item.active > a {
    ${({ theme }) => css`
      background: ${theme.colors.primary};
      color: white;
      border-color: ${theme.colors.primary};
    `}
  }
`
