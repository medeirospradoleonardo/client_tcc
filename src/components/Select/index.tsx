import React from 'react'

import Select, {
  GroupBase,
  MultiValue,
  OptionProps,
  SingleValue,
  SingleValueProps,
  StylesConfig
} from 'react-select'

import * as S from './styles'
import { SelectComponents } from 'react-select/dist/declarations/src/components'

export type OptionType = {
  value: string
  label: string
  color?: string
}

type SelectComponentProps = {
  label?: string
  customStyle?: StylesConfig<OptionType>
  Option?: (props: OptionProps<OptionType>) => JSX.Element
  SingleValue?: (props: SingleValueProps<OptionType>) => JSX.Element
  options: OptionType[]
  defaultOption?: OptionType
  placeholder?: string
  isSearchable?: boolean
  maxMenuHeight?: number
  setData: (e: MultiValue<OptionType> | SingleValue<OptionType>) => void
}

const SelectComponent = ({
  label,
  customStyle,
  Option,
  SingleValue,
  options,
  defaultOption,
  placeholder,
  isSearchable = false,
  maxMenuHeight = 200,
  setData
}: SelectComponentProps) => {
  const components: Partial<
    SelectComponents<OptionType, boolean, GroupBase<OptionType>>
  > = {}
  if (Option) {
    components.Option = Option
  }

  if (SingleValue) {
    components.SingleValue = SingleValue
  }

  return (
    <>
      <S.Label htmlFor={`indicators-dropdown${label}`}>{label}</S.Label>
      <Select
        placeholder={placeholder}
        components={components}
        isSearchable={isSearchable}
        inputId={`indicators-dropdown${label}`}
        maxMenuHeight={maxMenuHeight}
        defaultValue={defaultOption}
        options={options}
        styles={customStyle}
        onChange={(e) => setData(e)}
      />
    </>
  )
}

export default SelectComponent
