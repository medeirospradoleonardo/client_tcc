import {
  OptionProps,
  SingleValueProps,
  StylesConfig,
  components
} from 'react-select'
import chroma from 'chroma-js'
import { OptionType } from 'components/Select'
import * as S from './styles'
import { getColorFromName } from 'components/Item'

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
    return {
      ...styles,
      display: 'flex',
      cursor: 'pointer',
      // justifyContent: 'center',
      backgroundColor: isSelected ? '#dddcdc' : '#FFF',
      color: '#030517',

      ':hover': {
        backgroundColor: '#dddcdc'
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
        style={
          {
            // backgroundColor: props.data.color,
            // alignItems: 'center',
            // color: '#FFF',
            // display: 'flex',
            // paddingLeft: 10,
            // paddingRight: 10,
            // justifyContent: 'center'
          }
        }
      >
        {props.label}
      </div>
    </components.Option>
  )
}

export const SingleValue = (props: SingleValueProps<OptionType>) => {
  return (
    <components.SingleValue {...props}>
      <S.Right>
        <div>
          <S.Avatar color={getColorFromName(props.data.label)}>
            <span>{props.data.label.charAt(0)}</span>
          </S.Avatar>
        </div>

        <span style={{ marginLeft: '10px' }} className="title">
          {props.data.label}
        </span>
      </S.Right>
    </components.SingleValue>
  )
}
