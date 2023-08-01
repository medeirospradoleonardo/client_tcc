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
import { FormError } from 'components/Form'
import { ErrorOutline, NewLabel } from '@styled-icons/material-outlined'
import {
  FieldErrors,
  createProjectValidate,
  signUpValidate
} from 'utils/validations'
import { User } from 'components/Table'
import {
  ApolloClient,
  NormalizedCacheObject,
  useMutation
} from '@apollo/client'
import { MUTATION_CREATE_PROJECT_USER_ROLE } from 'graphql/mutations/projectUserRole'
import { MUTATION_CREATE_PROJECT } from 'graphql/mutations/project'
import { Session } from 'next-auth'

export type FormProjectProps = {
  nameProject?: string
  closeModal: () => void
  usersOptions: MultiValue<OptionType>
  option?: 'create' | 'edit'
  user: User
  session: Session
  scrumMastersReceived: selectValue
  productOwnersReceived: selectValue
  membersReceived: selectValue
}

type selectValue = MultiValue<{
  label: string
  value: string
}>

const FormProject = ({
  nameProject,
  closeModal,
  usersOptions,
  option = 'create',
  user,
  session,
  scrumMastersReceived,
  productOwnersReceived,
  membersReceived
}: FormProjectProps) => {
  const [scrumMasters, setScrumMasters] =
    useState<selectValue>(scrumMastersReceived)
  const [productOwners, setProductOwners] = useState<selectValue>(
    productOwnersReceived
  )
  const [members, setMembers] = useState<selectValue>(membersReceived)
  const [users, setUsers] = useState<MultiValue<OptionType>>(usersOptions)
  const [name, setName] = useState<string>(nameProject ? nameProject : '')
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})

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

  const [createProjectGraphQL, { error, loading }] = useMutation(
    MUTATION_CREATE_PROJECT,
    {
      context: { session },
      onError: (err) => {
        err?.graphQLErrors[0]?.message == 'This attribute must be unique'
          ? setFormError('Nome do projeto já existente')
          : setFormError(err?.graphQLErrors[0]?.message)
      }
    }
  )

  const createProject = () => {
    if (
      scrumMasters.length == 0 &&
      productOwners.length == 0 &&
      members.length == 0
    ) {
      setFormError(
        'O projeto precisa ter pelo menos um integrante para ser criado'
      )
      return
    }
    if (
      !scrumMasters.find((e) => e.value == user.id) &&
      !productOwners.find((e) => e.value == user.id)
    ) {
      setFormError(
        'O usuário criador do projeto precisa ter papel de Scrum Master ou Product Owner'
      )
      return
    }
    setFormError('')
    const errors = createProjectValidate(name)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }
    setFieldError({})

    createProjectGraphQL({
      variables: {
        nameProject: name
      }
    })

    if (error) {
      console.log('fafd')
      console.log(error)
      return
    }
    // scrumMasters.map((u) => {
    //   createProjectUserRole({
    //     variables: {
    //       role: 'scrumMaster',
    //       userId: u.value
    //     }
    //   })
    // })
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

        {!!formError && (
          <FormError>
            <ErrorOutline /> {formError}
          </FormError>
        )}
        <S.Content>
          <S.Left></S.Left>
          <S.Right></S.Right>
          <TextField
            name="name"
            icon={<NewLabel />}
            placeholder="Nome do projeto"
            label="Nome do projeto"
            initialValue={name}
            error={fieldError?.name}
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
              onClick={option == 'create' ? createProject : editProject}
            >
              {option == 'create' ? 'Criar projeto' : 'Editar projeto'}
            </Button>
          </S.ButtonContainer>
        </S.Content>
      </Container>
    </>
  )
}

export default FormProject
