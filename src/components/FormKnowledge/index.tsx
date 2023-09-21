import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'

import * as S from './styles'
import { Container } from 'components/Container'

import { FormError } from 'components/Form'
import { ErrorOutline, NewLabel } from '@styled-icons/material-outlined'
import { useState } from 'react'
import { Knowledge } from 'templates/KnowledgeBase'
import { User } from 'templates/ProductBacklog'
import { ArrowBack } from '@styled-icons/material-outlined/ArrowBack'
import RichText from 'components/RichText'
import { FieldErrors, createKnowledgeValidate } from 'utils/validations'
import { Session } from 'next-auth'
import { useMutation } from '@apollo/client'
import {
  MUTATION_CREATE_KNOWLEDGE,
  MUTATION_UPDATE_KNOWLEDGE
} from 'graphql/mutations/knowledge'

export type FormKnowledgeProps = {
  user: User
  refreshKnowledges: (knowledge: Knowledge) => void
  session: Session
  option?: string
  closeForm: () => void
  initialKnowledge: Knowledge
}

export type FormKnowledgeValues = {
  title: string | undefined
}

const FormProject = ({
  user,
  refreshKnowledges,
  session,
  option = 'create',
  closeForm,
  initialKnowledge
}: FormKnowledgeProps) => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const [values, setValues] = useState<Knowledge>({
    id: initialKnowledge.id,
    title: initialKnowledge.title,
    content: initialKnowledge.content,
    author: {
      id: initialKnowledge.author.id,
      name: initialKnowledge.author.name
    },
    categories: initialKnowledge.categories
  })

  const handleInput = (field: string, value: string | null | User | number) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const [createKnowledgeGraphQL] = useMutation(MUTATION_CREATE_KNOWLEDGE, {
    context: { session },
    onCompleted: (data) => {
      refreshKnowledges({
        id: data.createKnowledge.data.id,
        title: data.createKnowledge.data.attributes.title,
        categories: [],
        author: {
          id: data.createKnowledge.data.attributes.author.data.id,
          name: data.createKnowledge.data.attributes.author.data.attributes
            .username
        }
      })
    }
  })

  const createKnowledge = () => {
    const errors = createKnowledgeValidate({
      title: values.title
    })

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    createKnowledgeGraphQL({
      variables: {
        title: values.title,
        content: values.content,
        categories: values.categories
          ? values.categories.map((category) => category.id)
          : null,
        authorId: user.id
      }
    })
  }

  const [editKnowledgeGraphQL] = useMutation(MUTATION_UPDATE_KNOWLEDGE, {
    context: { session },
    onCompleted: (data) => {
      refreshKnowledges({
        id: data.updateKnowledge.data.id,
        title: data.updateKnowledge.data.attributes.title,
        categories: [],
        author: {
          id: data.updateKnowledge.data.attributes.author.data.id,
          name: data.updateKnowledge.data.attributes.author.data.attributes
            .username
        }
      })
    }
  })

  const editKnowledge = () => {
    const errors = createKnowledgeValidate({
      title: values.title
    })

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    editKnowledgeGraphQL({
      variables: {
        knowledgeId: values.id,
        title: values.title,
        content: values.content,
        categories: values.categories
          ? values.categories.map((category) => category.id)
          : null
      }
    })
  }

  return (
    <Container>
      <Button
        minimal
        size="small"
        style={{ marginBottom: '10px' }}
        onClick={closeForm}
        icon={<ArrowBack />}
      >
        Voltar
      </Button>
      <S.Heading>
        <Heading lineBottom color="black" size="small">
          Detalhes do documento
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
          icon={<NewLabel />}
          placeholder="Título do documento"
          label="Título do documento"
          initialValue={values.title}
          error={fieldError?.title}
          onInputChange={(v) => handleInput('title', v)}
          style={{ height: '30px' }}
        />
        <S.Content>
          <RichText
            input="content"
            content={values.content}
            label="Conteudo"
            setData={handleInput}
            style={{
              border: '1px solid rgb(227, 232, 241)',

              height: '360px'
            }}
          />
        </S.Content>
        <S.ButtonContainer>
          <Button
            size="small"
            style={{ marginBottom: '10px' }}
            onClick={option == 'create' ? createKnowledge : editKnowledge}
          >
            {option == 'create' ? 'Criar documento' : 'Editar documento'}
          </Button>
        </S.ButtonContainer>
      </S.Content>
    </Container>
  )
}

export default FormProject
