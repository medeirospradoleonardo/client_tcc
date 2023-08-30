import {
  OptionProps,
  SingleValueProps,
  StylesConfig,
  components
} from 'react-select'
import chroma from 'chroma-js'
import { OptionType } from 'components/Select'

export const options = [
  {
    value: 'notInitiated',
    label: 'NÃO INICIADO',
    color: '#DA5757'
  },
  {
    value: 'inProgress',
    label: 'EM PROGRESSO',
    color: '#a6b805'
  },
  { value: 'concluded', label: 'CONCLUÍDO', color: '#11831a' }
]

export const defaultOption = {
  value: 'notInitiated',
  label: 'NÃO INICIADO',
  color: '#DA5757'
}

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  color: '#FFF',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: color
})

export const colourStylesStatus: StylesConfig<OptionType> = {
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
    const color = data.color && chroma(data.color)
    return {
      ...styles,
      display: 'flex',
      cursor: 'pointer',
      justifyContent: 'center',
      backgroundColor: isSelected ? color && color.alpha(0.3).css() : '#FFF',

      ':hover': {
        backgroundColor: color && color.alpha(0.3).css()
      },

      fontFamily:
        "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }
  }
}

export const Option = (props: OptionProps<OptionType>) => {
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

export const SingleValue = (props: SingleValueProps<OptionType>) => {
  return (
    <components.SingleValue {...props}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            backgroundColor: props.data.color,
            alignItems: 'center',
            color: '#FFF',
            width: '90%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <span>{props.data.label}</span>
        </div>
      </div>
    </components.SingleValue>
  )
}
