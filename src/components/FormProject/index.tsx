import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Link from 'next/link'

import * as S from './styles'
import { Container } from 'components/Container'
import MultipleSelectChip from 'components/MultipleSelectChip'
import SelectChips from 'components/SelectChips'
import { useEffect, useState } from 'react'
import { MultiValue } from 'react-select'
import { OptionType } from '@atlaskit/select'

export type FormProjectProps = {
  nameProject?: string
  closeModal: () => void
  usersOptions: MultiValue<OptionType>
}

type selectValue = MultiValue<{
  label: string
  value: string
}>

const FormProject = ({
  nameProject,
  closeModal,
  usersOptions
}: FormProjectProps) => {
  const [scrumMasters, setScrumMasters] = useState<selectValue>([])
  const [productOwners, setProductOwners] = useState<selectValue>([])
  const [members, setMembers] = useState<selectValue>([])
  const [users, setUsers] = useState<MultiValue<OptionType>>(usersOptions)
  const [name, setName] = useState<string>(nameProject ? nameProject : '')

  useEffect(() => {
    let usersNew = []
    usersNew = usersOptions.filter((u) => {
      if (
        !scrumMasters.find((e) => e.value == u.value) &&
        !productOwners.find((e) => e.value == u.value) &&
        !members.find((e) => e.value == u.value)
      ) {
        return u
      }
    })

    setUsers(usersNew)
  }, [scrumMasters, productOwners, members])

  const handleInput = (value: string) => {
    setName(value)
  }

  const createProject = () => {
    //
  }

  const editProject = () => {
    console.log('edit')
  }

  return (
    <>
      <Container>
        <Heading lineBottom color="black" size="small">
          Detalhes do projeto
        </Heading>

        <S.Content>
          <S.Left></S.Left>
          <S.Right></S.Right>
          <TextField
            name="name"
            placeholder="Nome do projeto"
            label="Nome do projeto"
            initialValue={name}
            onInputChange={(v) => handleInput(v)}
            style={{ height: '30px' }}
          />
          <SelectChips
            label="Scrum Master"
            setData={setScrumMasters}
            defaultValues={scrumMasters}
            options={users}
          />
          <SelectChips
            label="Product Owner"
            setData={setProductOwners}
            defaultValues={productOwners}
            options={users}
          />
          <SelectChips
            label="Membro"
            setData={setMembers}
            defaultValues={members}
            options={users}
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
              onClick={!name ? createProject : editProject}
            >
              {!name ? 'Criar projeto' : 'Editar projeto'}
            </Button>
          </S.ButtonContainer>
        </S.Content>
      </Container>
    </>
  )
}

export default FormProject
