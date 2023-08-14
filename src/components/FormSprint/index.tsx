import { Container } from 'components/Container'
import * as S from './styles'
import Heading from 'components/Heading'
import { FormError } from 'components/Form'
import { ErrorOutline } from '@styled-icons/material-outlined'
import SelectChips from 'components/SelectChips'
import Button from 'components/Button'
import { useState } from 'react'
import TextField from 'components/TextField'
import { FieldErrors, createSprintValidate } from 'utils/validations'
import { useMutation } from '@apollo/client'
import { MUTATION_CREATE_SPRINT } from 'graphql/mutations/sprint'
import { Session } from 'next-auth'
import { Project } from 'templates/Projects'
import { Sprint } from 'templates/ProductBacklog'

export type FormSprintProps = {
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
  session,
  activeProject,
  closeModal,
  setSprints,
  option = 'create'
}: FormSprintProps) => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState<SprintValues>({
    name: '',
    initialDate: '',
    finalDate: ''
  })

  const [createSprintGraphQL] = useMutation(MUTATION_CREATE_SPRINT, {
    context: { session },
    onError: (err) => {
      setFormError(err?.graphQLErrors[0]?.message)
    }
  })

  const createSprint = async () => {
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

    const { data: sprint, errors: errorsCreateSprint } =
      await createSprintGraphQL({
        variables: {
          projectId: activeProject.id,
          name: values.name,
          initialDate: values.initialDate,
          finalDate: values.finalDate
        }
      })

    if (errorsCreateSprint) {
      return
    }

    setSprints({
      id: sprint.createSprint.data.id as string,
      name: sprint.createSprint.data.attributes.name as string,
      initialDate: sprint.createSprint.data.attributes.initialDate as string,
      finalDate: sprint.createSprint.data.attributes.finalDate as string,
      boards: []
    })
    closeModal()
  }

  const editSprint = () => {
    //
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
