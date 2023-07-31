import React from 'react'

import Select, {
  OptionType,
  StylesConfig,
  components,
  DropdownIndicatorProps
} from '@atlaskit/select'

import * as S from './styles'

import { MultiValue } from 'react-select'

const cities = [
  { label: 'Leonardo Medeiros Prado', value: 'adelaide' },
  { label: 'Camila Medeiros Prado', value: 'brisbane' },
  { label: 'Vilma Richart Prado', value: 'canberra' }
]

const DropdownIndicator = (props: DropdownIndicatorProps<OptionType, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      {/* <EmojiIcon label="Emoji" primaryColor={cities[2].color} /> */}
    </components.DropdownIndicator>
  )
}

type SelectChipsProps = {
  label: string
  setData: (
    e: MultiValue<{
      label: string
      value: string
    }>
  ) => void
  options: MultiValue<OptionType>
  defaultValues?: MultiValue<{
    label: string
    value: string
  }>
}

const customStyles: StylesConfig = {
  container: (styles) => ({
    ...styles
  }),
  control: (styles, state) => ({
    ...styles
  })
}

export default function SelectChips({
  label,
  setData,
  options,
  defaultValues = []
}: SelectChipsProps) {
  return (
    <>
      <S.Label htmlFor={`indicators-dropdown${label}`}>{label}</S.Label>
      <Select
        inputId={`indicators-dropdown${label}`}
        closeMenuOnSelect={false}
        components={{ DropdownIndicator }}
        defaultValue={defaultValues}
        isMulti
        options={options}
        placeholder={`Selecione um ${label} para o projeto`}
        styles={customStyles}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? 'Sem resultados' : 'Sem resultados'
        }
        onChange={(e) => setData(e)}
        // appearance="subtle"
      />
    </>
  )
}
