import React from 'react'
import chroma from 'chroma-js'
import { ColourOption, colourOptions } from './data'
import Select, { components, OptionProps, StylesConfig } from 'react-select'

import * as S from './styles'

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  color: '#FFF',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: color
})

const Option = (props: OptionProps<ColourOption>) => {
  return (
    <components.Option {...props}>
      <div
        style={{
          backgroundColor: props.data.color,
          alignItems: 'center',
          color: '#FFF',
          display: 'flex',
          paddingLeft: 10,
          paddingRight: 10,
          justifyContent: 'center'
        }}
      >
        {props.label}
      </div>
    </components.Option>
  )
}

const colourStyles: StylesConfig<ColourOption> = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: '#EAEAEA',
    border: 'none',
    boxShadow: state.isFocused ? '0 0 0.5rem #F26122' : 'none',
    ':focus': {
      border: state.isFocused ? '0.2rem solid #EAEAEA' : 'none',
      boxShadow: state.isFocused ? '0 0 0.5rem #F26122' : 'none'
    },
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#dddcdc'
    }
  }),
  option: (styles, { data, isSelected }) => {
    const color = chroma(data.color)
    return {
      ...styles,
      display: 'flex',
      cursor: 'pointer',
      justifyContent: 'center',
      backgroundColor: isSelected ? color.alpha(0.3).css() : '#FFF',

      ':hover': {
        backgroundColor: color.alpha(0.3).css()
      },

      fontFamily:
        "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ffffff') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
}

type SelectComponentProps = {
  label?: string
}

const SelectComponent = ({ label }: SelectComponentProps) => (
  <>
    <S.Label htmlFor={`indicators-dropdown${label}`}>{label}</S.Label>
    <Select
      components={{ Option }}
      isSearchable={false}
      inputId={`indicators-dropdown${label}`}
      defaultValue={colourOptions[0]}
      options={colourOptions}
      styles={colourStyles}
    />
  </>
)

export default SelectComponent
