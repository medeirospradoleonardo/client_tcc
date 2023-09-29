import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'

import * as S from './styles'
import { Container } from 'components/Container'

import { FormError } from 'components/Form'
import { ErrorOutline, NewLabel } from '@styled-icons/material-outlined'
import { useState } from 'react'
import { Knowledge, Story } from 'templates/KnowledgeBase'
import { User } from 'templates/ProductBacklog'
import { ArrowBack } from '@styled-icons/material-outlined/ArrowBack'
import { PersonOutline } from '@styled-icons/material-outlined/PersonOutline'
import { History } from '@styled-icons/material-outlined/History'
import RichText from 'components/RichText'
import { FieldErrors, createKnowledgeValidate } from 'utils/validations'
import { Session } from 'next-auth'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  MUTATION_CREATE_KNOWLEDGE,
  MUTATION_UPDATE_KNOWLEDGE
} from 'graphql/mutations/knowledge'
import { Dialog } from '@mui/material'

import FormUsers, { FormUsersProps } from 'components/FormUsers'
import HistoryKnowledge, {
  HistoryKnowledgeProps
} from 'components/HistoryKnowledge'
import { QUERY_ALL_USERS } from 'graphql/queries/user'
import { QueryAllUsers } from 'graphql/generated/QueryAllUsers'
import { usersToSelectMapper } from 'utils/mappers'
import { SelectValue } from 'components/FormProject'
import { QueryGetKnowledge } from 'graphql/generated/QueryGetKnowledge'
import { QUERY_GET_KNOWLEDGE } from 'graphql/queries/knowledge'

export type FormKnowledgeProps = {
  permited: boolean
  isAdmin: boolean
  user: User
  refreshKnowledges: () => void
  session: Session
  option?: string
  closeForm: () => void
  addTotal: () => void
  initialKnowledge: Knowledge
}

export type FormKnowledgeValues = {
  title: string | undefined
}

const FormKnowledge = ({
  permited,
  isAdmin,
  user,
  refreshKnowledges,
  session,
  option = 'create',
  closeForm,
  addTotal,
  initialKnowledge
}: FormKnowledgeProps) => {
  const [formError, setFormError] = useState('')
  const [isEdit, setIsEdit] = useState(option == 'edit')
  const [isModified, setIsModified] = useState(false)
  const [isOpenFormUsers, setIsOpenFormUsers] = useState(false)
  const [isOpenHistoryKnowledge, setIsOpenHistoryKnowledge] = useState(false)
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const handleClose = (event: React.MouseEventHandler, reason: string) => {
    if (reason && reason == 'backdropClick') return

    setIsOpenFormUsers(false)
    setIsOpenHistoryKnowledge(false)
  }

  const [values, setValues] = useState<Knowledge>({
    id: initialKnowledge.id,
    title: initialKnowledge.title,
    content: initialKnowledge.content,
    author: {
      id: initialKnowledge.author.id,
      name: initialKnowledge.author.name
    },
    usersCanEdit: initialKnowledge.usersCanEdit
      ? initialKnowledge.usersCanEdit.map((u) => ({
          id: u.id,
          name: u.name
        }))
      : [],
    categories: initialKnowledge.categories,
    stories: initialKnowledge.stories
  })

  const handleInput = (
    field: string,
    value: string | null | User | number | User[]
  ) => {
    if (field == 'content') {
      if (values.content != value) {
        setIsModified(true)
      }
    } else {
      setIsModified(true)
    }
    setValues((s) => ({ ...s, [field]: value }))
  }

  const [createKnowledgeGraphQL] = useMutation(MUTATION_CREATE_KNOWLEDGE, {
    context: { session },
    onCompleted: (data) => {
      handleInput('author', {
        id: data.createKnowledge.data.attributes.author.data.id,
        name: data.createKnowledge.data.attributes.author.data.attributes
          .username
      })
      refreshKnowledges()
      addTotal()
      handleInput('id', data.createKnowledge.data.id)
      setIsModified(false)
      setIsEdit(true)
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
        authorId: user.id,
        usersCanEdit: values.usersCanEdit
          ? values.usersCanEdit.map((u) => u.id)
          : null,
        categories: values.categories
          ? values.categories.map((category) => category.id)
          : null
      }
    })
  }

  const [editKnowledgeGraphQL] = useMutation(MUTATION_UPDATE_KNOWLEDGE, {
    context: { session },
    onCompleted: (data) => {
      refreshKnowledges()

      setIsModified(false)
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
        usersCanEdit: values.usersCanEdit
          ? values.usersCanEdit.map((u) => u.id)
          : null,
        categories: values.categories
          ? values.categories.map((category) => category.id)
          : null
      }
    })
  }

  const FormUsersPropsDefault = {
    closeModal: () => setIsOpenFormUsers(false),
    usersOptions: [{ label: '', value: '' }],
    usersCanEdit: [] as SelectValue,
    handleInput: handleInput
  }

  const [propsFormUsers, setPropsFormUsers] = useState<FormUsersProps>(
    FormUsersPropsDefault
  )

  const [getAllUsers, { data: QueryAllUsers }] = useLazyQuery<QueryAllUsers>(
    QUERY_ALL_USERS,
    {
      context: { session },
      onCompleted: () => {
        const propsFormUsersNew = FormUsersPropsDefault
        propsFormUsersNew.usersOptions = usersToSelectMapper(
          QueryAllUsers?.usersPermissionsUsers?.data || []
        )
        propsFormUsersNew.usersCanEdit = values.usersCanEdit
          ? values.usersCanEdit.map((u) => ({
              label: u.name,
              value: u.id
            }))
          : []
        setPropsFormUsers(propsFormUsersNew)
      }
    }
  )

  const openFormUsers = async () => {
    await getAllUsers({
      variables: {
        IdUser: values.author.id
      },
      fetchPolicy: 'no-cache'
    })

    setIsOpenFormUsers(true)
  }

  const historyKnowledgePropsDefault = {
    closeModal: () => setIsOpenHistoryKnowledge(false),
    stories: [] as Story[]
  }

  const [propsHistoryKnowledge, setPropsHistoryKnowledge] =
    useState<HistoryKnowledgeProps>(historyKnowledgePropsDefault)

  const [getKnowledgeGraphql, { data: dataQueryKnowledge }] =
    useLazyQuery<QueryGetKnowledge>(QUERY_GET_KNOWLEDGE, {
      context: { session },
      onCompleted: () => {
        const propsHistoryKnowledgeNew = historyKnowledgePropsDefault
        propsHistoryKnowledgeNew.stories = dataQueryKnowledge?.knowledge?.data
          ?.attributes?.stories?.data
          ? dataQueryKnowledge?.knowledge?.data?.attributes?.stories?.data?.map(
              (story) => ({
                author: story.attributes?.author || '',
                date: story.attributes?.date || ''
              })
            )
          : []
        setPropsHistoryKnowledge(propsHistoryKnowledgeNew)
        setIsOpenHistoryKnowledge(true)
      }
    })

  const openHistoryKnowledge = async () => {
    await getKnowledgeGraphql({
      variables: {
        id: values.id
      },
      fetchPolicy: 'no-cache'
    })
  }

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={isOpenFormUsers}
        onClose={handleClose}
      >
        <FormUsers {...propsFormUsers} />
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={isOpenHistoryKnowledge}
        onClose={handleClose}
      >
        <HistoryKnowledge {...propsHistoryKnowledge} />
      </Dialog>
      <Container style={{ height: '100%' }}>
        <S.ButtonsHeading>
          <S.Left>
            <Button
              minimal
              size="small"
              padding={false}
              onClick={() => {
                refreshKnowledges()
                closeForm()
              }}
              icon={<ArrowBack />}
            >
              Voltar
            </Button>
          </S.Left>
          <S.Right>
            {isEdit && permited && (
              <Button
                minimal
                size="small"
                padding={false}
                onClick={openHistoryKnowledge}
                icon={<History />}
              >
                Histórico de edição
              </Button>
            )}
            {(isAdmin || (!isAdmin && values.author.id == user.id)) && (
              <Button
                style={{ marginLeft: '10px' }}
                minimal
                size="small"
                padding={false}
                onClick={openFormUsers}
                icon={<PersonOutline />}
              >
                Usuários
              </Button>
            )}
          </S.Right>
        </S.ButtonsHeading>
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
            disabled={isEdit && !permited}
          />
          <S.Content>
            <RichText
              input="content"
              content={values.content}
              label="Conteúdo"
              setData={handleInput}
              style={{
                border: '1px solid rgb(227, 232, 241)',

                height: '360px'
              }}
              disabled={isEdit && !permited}
            />
          </S.Content>
          <S.Footer>
            {isEdit && (
              <S.Left>
                <S.CreateBy>Criado por: {values.author.name}</S.CreateBy>
              </S.Left>
            )}
            {!(isEdit && !permited) && (
              <S.Right>
                <Button
                  size="small"
                  // style={{ marginBottom: '10px' }}
                  onClick={isEdit ? editKnowledge : createKnowledge}
                  disabled={isEdit ? !isModified : false}
                >
                  {isEdit ? 'Editar documento' : 'Criar documento'}
                </Button>
              </S.Right>
            )}
          </S.Footer>
        </S.Content>
      </Container>
    </>
  )
}

export default FormKnowledge
