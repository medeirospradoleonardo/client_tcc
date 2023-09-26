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

export type FormUsersProps = {
  closeModal: () => void
  usersOptions: MultiValue<OptionType>
  usersCanEdit: SelectValue
  handleInput: (
    field: string,
    value: string | null | User | number | User[]
  ) => void
}

const FormUsers = ({
  closeModal,
  usersOptions,
  usersCanEdit,
  handleInput
}: FormUsersProps) => {
  const [users, setUsers] = useState<MultiValue<OptionType>>(usersOptions)
  const [usersCanEditData, setUsersCanEditData] =
    useState<SelectValue>(usersCanEdit)

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
        <S.ButtonContainer>
          <Button
            minimal
            size="small"
            style={{ marginBottom: '10px' }}
            onClick={closeModal}
          >
            Cancelar
          </Button>
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
              closeModal()
            }}
          >
            Salvar
          </Button>
        </S.ButtonContainer>
      </S.Content>
    </Container>
  )
}

export default FormUsers
