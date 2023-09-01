import styled, { css } from 'styled-components'

export const EditorCont = styled.div`
  .ql-toolbar.ql-snow {
    border-radius: 4px 4px 0 0;
    border: 1px solid #dfe1e6;
    border-bottom: none;
  }
  .ql-container.ql-snow {
    border-radius: 0 0 4px 4px;
    border: 1px solid #dfe1e6;
    border-top: none;
    color: #172b4d;
    font-size: 15px;
    font-family: 'CircularStdBook';
    font-weight: normal;
  }
  .ql-editor {
    height: 280px;
    width: 491px;
  }
`

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    cursor: pointer;
  `}
`
