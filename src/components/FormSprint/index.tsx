import { Container } from 'components/Container'
import * as S from './styles'
import Heading from 'components/Heading'
import { FormError } from 'components/Form'
import { ErrorOutline } from '@styled-icons/material-outlined'

import Button from 'components/Button'
import { useState } from 'react'
import TextField from 'components/TextField'
import { FieldErrors, createSprintValidate } from 'utils/validations'
import { useMutation } from '@apollo/client'
import {
  MUTATION_CREATE_SPRINT,
  MUTATION_UPDATE_SPRINT
} from 'graphql/mutations/sprint'
import { Session } from 'next-auth'
import { Project } from 'templates/Projects'
import { Sprint } from 'templates/ProductBacklog'

export type FormSprintProps = {
  initialSprint: Sprint
  session: Session
  activeProject: Project
  closeModal: () => void
  setSprints: (sprint: Sprint) => void
  option?: 'create' | 'edit'
}

export type SprintValues = {
  name: string | undefined
  initialDate: string
  finalDate: string
}

const FormSprint = ({
  initialSprint,
  session,
  activeProject,
  closeModal,
  setSprints,
  option = 'create'
}: FormSprintProps) => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState<SprintValues>({
    name: initialSprint.name,
    initialDate: initialSprint.initialDate,
    finalDate: initialSprint.finalDate
  })

  const [createSprintGraphQL] = useMutation(MUTATION_CREATE_SPRINT, {
    context: { session },
    onError: (err) => {
      setFormError(err?.graphQLErrors[0]?.message)
    },
    onCompleted: (data) => {
      setSprints({
        id: data.createSprint.data.id,
        name: data.createSprint.data.attributes.name,
        initialDate: data.createSprint.data.attributes.initialDate,
        finalDate: data.createSprint.data.attributes.finalDate,
        expand: data.createSprint.data.attributes.expand,
        boards: []
      })

      closeModal()
    }
  })

  const createSprint = () => {
    const errors = createSprintValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    setFieldError({})

    const dateToday = new Date()
    const dateTodayString =
      dateToday.getFullYear() +
      '-' +
      (dateToday.getMonth() + 1) +
      '-' +
      (dateToday.getDate() - 1)

    if (values.initialDate >= values.finalDate) {
      setFormError(
        'A data inicial nao pode ser maior ou igual que a data final'
      )
      return
    } else if (new Date(values.initialDate) < new Date(dateTodayString)) {
      setFormError('A data inicial nao pode ser mais antiga que a atual')
      return
    }

    setFormError('')

    createSprintGraphQL({
      variables: {
        projectId: activeProject.id,
        name: values.name,
        initialDate: values.initialDate,
        finalDate: values.finalDate
      }
    })
  }

  const [updateSprintGraphQL] = useMutation(MUTATION_UPDATE_SPRINT, {
    context: { session },
    onError: (err) => {
      setFormError(err?.graphQLErrors[0]?.message)
    },
    onCompleted: (data) => {
      setSprints({
        id: data.updateSprint.data.id,
        name: data.updateSprint.data.attributes.name,
        initialDate: data.updateSprint.data.attributes.initialDate,
        finalDate: data.updateSprint.data.attributes.finalDate,
        expand: data.updateSprint.data.attributes.expand,
        boards: []
      })

      closeModal()
    }
  })

  const editSprint = () => {
    const errors = createSprintValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    setFieldError({})

    if (values.initialDate >= values.finalDate) {
      setFormError(
        'A data inicial nao pode ser maior ou igual que a data final'
      )
      return
    }

    setFormError('')

    updateSprintGraphQL({
      variables: {
        id: initialSprint.id,
        name: values.name,
        initialDate: values.initialDate,
        finalDate: values.finalDate
      }
    })
  }

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  return (
    <Container>
      <S.Heading>
        <Heading lineBottom color="black" size="small">
          Detalhes do sprint
        </Heading>
      </S.Heading>

      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <S.Content>
        <TextField
          name="name"
          placeholder="Nome"
          label="Nome"
          initialValue={values.name}
          error={fieldError?.name}
          onInputChange={(v) => handleInput('name', v)}
          style={{ height: '30px' }}
        />
        <S.DateContainer>
          <TextField
            type="date"
            name="initialDate"
            placeholder="Data inicial"
            label="Data inicial"
            initialValue={values.initialDate}
            error={fieldError?.initialDate}
            onInputChange={(v) => handleInput('initialDate', v)}
            style={{ height: '30px' }}
          />
          <TextField
            type="date"
            name="finalDate"
            placeholder="Data final"
            label="Data final"
            initialValue={values.finalDate}
            error={fieldError?.finalDate}
            onInputChange={(v) => handleInput('finalDate', v)}
            style={{ height: '30px' }}
          />
        </S.DateContainer>
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
            onClick={option == 'create' ? createSprint : editSprint}
          >
            {option == 'create' ? 'Criar sprint' : 'Editar sprint'}
          </Button>
        </S.ButtonContainer>
      </S.Content>
    </Container>
  )
}

export default FormSprint
