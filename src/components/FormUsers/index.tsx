import { Container } from 'components/Container'
import * as S from './styles'
import Heading from 'components/Heading'

import Button from 'components/Button'
import SelectChips from 'components/SelectChips'

import { useState } from 'react'
import { MultiValue } from 'react-select'
import { OptionType } from '@atlaskit/select'
import { SelectValue } from 'components/FormProject'
import { User } from 'templates/ProductBacklog'

import Switch from '@mui/material/Switch'
import { alpha, styled } from '@mui/material'

const PrimaryColorSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#F26122',
    '&:hover': {
      backgroundColor: alpha('#F26122', theme.palette.action.hoverOpacity)
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#F26122'
  }
}))

export type FormUsersProps = {
  closeModal: () => void
  openAdvice: () => void
  usersOptions: MultiValue<OptionType>
  usersCanEdit: SelectValue
  handleInput: (
    field: string,
    value: string | null | User | number | User[] | boolean | undefined
  ) => void
  allUsersCanEdit: boolean | null | undefined
}

const FormUsers = ({
  closeModal,
  openAdvice,
  usersOptions,
  usersCanEdit,
  handleInput,
  allUsersCanEdit
}: FormUsersProps) => {
  const [users, setUsers] = useState<MultiValue<OptionType>>(usersOptions)
  const [usersCanEditData, setUsersCanEditData] =
    useState<SelectValue>(usersCanEdit)

  const [allUsersCanEditData, setAllUsersCanEditData] =
    useState(allUsersCanEdit)

  const editUsers = () => {
    //
  }

  const setDataUsers = (value: MultiValue<OptionType>) => {
    setUsersCanEditData(
      value.map((user) => {
        return {
          label: `${user.label}`,
          value: `${user.value}`
        }
      })
    )
  }
  return (
    <Container>
      <S.Heading>
        <Heading lineBottom color="black" size="small">
          Usuários que podem editar o documento
        </Heading>
      </S.Heading>

      <S.Content>
        <SelectChips
          setData={setDataUsers}
          defaultValues={usersCanEditData}
          options={users}
          maxMenuHeight={150}
          placeholder="Selecione"
        />
        <S.SwitchContainer>
          <S.SwitchLabel>Todos usuários do sistema</S.SwitchLabel>
          <S.Switch>
            <PrimaryColorSwitch
              checked={!!allUsersCanEditData}
              onChange={() => setAllUsersCanEditData(!allUsersCanEditData)}
            />
          </S.Switch>
        </S.SwitchContainer>
        <S.ButtonContainer>
          {/* <S.Info>
            Atenção: Só será feita a alteração clicando no botão &quot;Editar
            documento&quot;
          </S.Info> */}
          <S.Button>
            <Button
              minimal
              size="small"
              style={{ marginBottom: '10px' }}
              onClick={closeModal}
            >
              Cancelar
            </Button>
          </S.Button>
          <S.Button>
            <Button
              size="small"
              style={{ marginBottom: '10px' }}
              onClick={() => {
                handleInput(
                  'usersCanEdit',
                  usersCanEditData.map((u) => ({
                    id: u.value,
                    name: u.label
                  }))
                )
                handleInput('allUsersCanEdit', allUsersCanEditData)
                closeModal()
                openAdvice()
              }}
            >
              Salvar
            </Button>
          </S.Button>
        </S.ButtonContainer>
      </S.Content>
    </Container>
  )
}

export default FormUsers
