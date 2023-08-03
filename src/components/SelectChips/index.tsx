import React from 'react'

import Select, {
  OptionType,
  StylesConfig,
  components,
  DropdownIndicatorProps
} from '@atlaskit/select'

import * as S from './styles'

import { MultiValue } from 'react-select'

const DropdownIndicator = (props: DropdownIndicatorProps<OptionType, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      {/* <EmojiIcon label="Emoji" primaryColor={cities[2].color} /> */}
    </components.DropdownIndicator>
  )
}

type SelectChipsProps = {
  label: string
  setData: (e: MultiValue<OptionType>) => void
  options: MultiValue<OptionType>
  defaultValues?: MultiValue<{
    label: string
    value: string
  }>
  maxMenuHeight?: number
  isMulti?: any
  placeholder: string
}

const customStyles: any = {
  container: (styles: any, state: any) => ({
    ...styles,
    '&:hover': {
      border: state.isFocused ? 'none' : 'none',
      boxShadow: state.isFocused ? 'none' : 'none'
    }
  }),
  control: (styles: any, state: any) => ({
    ...styles,
    // backgroundColor: '#EAEAEA',
    border: state.isFocused ? '0.2rem solid #EAEAEA' : 'none',
    boxShadow: state.isFocused ? '0 0 0.5rem #F26122' : 'none',
    ':focus': {
      border: state.isFocused ? '0.2rem solid #EAEAEA' : 'none',
      boxShadow: state.isFocused ? '0 0 0.5rem #F26122' : 'none'
    },
    ':focus-within': {
      border: state.isFocused ? '0.2rem solid #EAEAEA' : 'none',
      boxShadow: state.isFocused ? '0 0 0.5rem #F26122' : 'none'
    }
  }),
  menuPortal: (styles: any) => ({
    ...styles
    // zIndex: 1000
  })
}

export default function SelectChips({
  label,
  setData,
  options,
  defaultValues = [],
  maxMenuHeight,
  isMulti = true,
  placeholder
}: SelectChipsProps) {
  return (
    <>
      <S.Label htmlFor={`indicators-dropdown${label}`}>{label}</S.Label>
      <Select
        inputId={`indicators-dropdown${label}`}
        closeMenuOnSelect={false}
        components={{ DropdownIndicator }}
        defaultValue={defaultValues}
        isMulti={isMulti}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        maxMenuHeight={maxMenuHeight || 100}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? 'Sem resultados' : 'Sem resultados'
        }
        onChange={(e) => setData(e)}
        // appearance="subtle"
      />
    </>
  )
}
