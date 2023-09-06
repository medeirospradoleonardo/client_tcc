import { Container } from 'components/Container'
import * as S from './styles'
import Heading from 'components/Heading'
import { FormError } from 'components/Form'
import { ErrorOutline } from '@styled-icons/material-outlined'

import Button from 'components/Button'
import { useState } from 'react'
import TextField from 'components/TextField'
import { FieldErrors, createBoardValidate } from 'utils/validations'
import { Board, User } from 'templates/ProductBacklog'
import SelectComponent, { OptionType } from 'components/Select'
import {
  Option,
  SingleValue as SingleValueStatus,
  colourStylesStatus,
  options
} from 'components/Select/configSelectStatus'

import {
  SingleValue as SingleValueResponsible,
  colourStylesStatus as colourStylesStatusResponsible
} from 'components/Select/configSelectResponsible'

import { WatchLater } from '@styled-icons/material-outlined/WatchLater'
import { Person } from '@styled-icons/material-outlined/Person'
import { getBoardStatus } from 'utils/mappers'
import { Project } from 'templates/Projects'

import {
  MUTATION_CREATE_BOARD,
  MUTATION_UPDATE_BOARD
} from 'graphql/mutations/board'
import { Session } from 'next-auth'
import { useMutation } from '@apollo/client'
import RichText from 'components/RichText'

export type FormBoardValues = {
  title: string | undefined
  timeEstimated: number
}

export type FormBoardProps = {
  permited: boolean
  session: Session
  initialBoard: Board
  closeModal: () => void
  activeProject: Project
  usersOptions: OptionType[]
  pathOptions: OptionType[]
  user: User
  option?: 'create' | 'edit'
  refreshBoardForm: (board: Board) => void
}

const FormBoard = ({
  permited,
  session,
  initialBoard,
  closeModal,
  activeProject,
  usersOptions,
  pathOptions,
  user,
  option = 'create',
  refreshBoardForm
}: FormBoardProps) => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [users, setUsers] = useState<OptionType[]>(usersOptions)
  const [values, setValues] = useState<Board>({
    id: initialBoard.id,
    title: initialBoard.title,
    createdDate: initialBoard.createdDate
      ? `${initialBoard.createdDate?.split('-')[2].split('T')[0]}/${
          initialBoard.createdDate?.split('-')[1]
        }/${initialBoard.createdDate?.split('-')[0]}`
      : undefined,
    conclusionDate: initialBoard.conclusionDate
      ? `${initialBoard.conclusionDate?.split('-')[2]}/${
          initialBoard.conclusionDate?.split('-')[1]
        }/${initialBoard.conclusionDate?.split('-')[0]}`
      : undefined,
    timeEstimated: initialBoard.timeEstimated,
    description: initialBoard.description,
    author: {
      id: initialBoard.author.id,
      name: initialBoard.author.name
    },
    responsible: initialBoard.responsible.id
      ? {
          id: initialBoard.responsible.id,
          name: initialBoard.responsible.name
        }
      : {
          id: user.id,
          name: user.name
        },
    sprint: initialBoard.sprint == '' ? null : initialBoard.sprint,
    status: initialBoard.status
  })

  const [editBoardGraphQL] = useMutation(MUTATION_UPDATE_BOARD, {
    context: { session },
    onCompleted: (data) => {
      refreshBoardForm({
        id: data.updateBoard.data.id,
        title: data.updateBoard.data.attributes.title,
        timeEstimated: data.updateBoard.data.attributes.timeEstimated,
        description: data.updateBoard.data.attributes.description,
        author: {
          id: data.updateBoard.data.attributes.author.data.id,
          name: data.updateBoard.data.attributes.author.data.attributes.username
        },
        responsible: {
          id: data.updateBoard.data.attributes.responsible.data.id,
          name: data.updateBoard.data.attributes.responsible.data.attributes
            .username
        },
        sprint: data.updateBoard.data.attributes.sprint.data?.id,
        status: data.updateBoard.data.attributes.status
      })
    }
  })

  const [createBoardGraphQL] = useMutation(MUTATION_CREATE_BOARD, {
    context: { session },
    onCompleted: (data) => {
      refreshBoardForm({
        id: data.createBoard.data.id,
        title: data.createBoard.data.attributes.title,
        timeEstimated: data.createBoard.data.attributes.timeEstimated,
        description: data.createBoard.data.attributes.description,
        author: {
          id: data.createBoard.data.attributes.author.data.id,
          name: data.createBoard.data.attributes.author.data.attributes.username
        },
        responsible: {
          id: data.createBoard.data.attributes.responsible.data.id,
          name: data.createBoard.data.attributes.responsible.data.attributes
            .username
        },
        sprint: data.createBoard.data.attributes.sprint.data?.id,
        status: data.createBoard.data.attributes.status
      })
    }
  })

  const createBoard = () => {
    const errors = createBoardValidate({
      title: values.title,
      timeEstimated: values.timeEstimated
    })

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    createBoardGraphQL({
      variables: {
        title: values.title,
        description: values.description,
        timeEstimated: values.timeEstimated,
        status: values.status,
        sprintId: values.sprint,
        authorId: user.id,
        responsibleId: values.responsible.id,
        projectId: activeProject.id
      }
    })
  }

  const editBoard = () => {
    const errors = createBoardValidate({
      title: values.title,
      timeEstimated: values.timeEstimated
    })

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    editBoardGraphQL({
      variables: {
        boardId: values.id,
        title: values.title,
        description: values.description,
        timeEstimated: values.timeEstimated,
        status: values.status,
        sprintId: values.sprint,
        authorId: user.id,
        responsibleId: values.responsible.id,
        projectId: activeProject.id
      }
    })
  }

  const handleInput = (field: string, value: string | null | User | number) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const setStatus = (option: any) => {
    handleInput('status', option.value)
  }

  const setPath = (option: any) => {
    option?.label != 'Backlog do produto'
      ? handleInput('sprint', option?.value)
      : handleInput('sprint', null)
  }

  const setResponsible = (option: any) => {
    handleInput('responsible', {
      id: option?.value,
      name: option?.label
    })
  }

  const getLabelPathWithId = (id: string) => {
    let label = ''
    pathOptions.map((p) => {
      if (p.value == id) {
        label = p.label
        return label
      }
    })

    return label
  }

  return (
    <Container>
      <S.Heading>
        <Heading lineBottom color="black" size="small">
          Detalhes do item
        </Heading>
      </S.Heading>

      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <S.Content>
        <S.Left>
          <div style={{ marginRight: '30px', width: '100%' }}>
            <TextField
              name="title"
              placeholder="Título"
              label="Título"
              initialValue={values.title}
              error={fieldError?.title}
              onInputChange={(v) => handleInput('title', v)}
              style={{ height: '30px' }}
            />
          </div>
          <S.Description>
            <RichText
              content={values.description}
              label="Descrição"
              setData={handleInput}
            />
          </S.Description>
        </S.Left>
        <S.Right>
          <S.Select>
            <S.Right>
              <div style={{ width: '130px' }}>
                <TextField
                  name="timeEstimated"
                  label="Tempo (Horas)"
                  icon={<WatchLater />}
                  initialValue={`${values.timeEstimated}`}
                  error={fieldError?.timeEstimated}
                  onInputChange={(v) =>
                    handleInput('timeEstimated', parseInt(v))
                  }
                  style={{ height: '34px', width: '72px' }}
                />
              </div>
              <div style={{ marginLeft: '30px', width: '200px' }}>
                <SelectComponent
                  Option={Option}
                  SingleValue={SingleValueStatus}
                  customStyle={colourStylesStatus}
                  label="Status"
                  options={options}
                  defaultOption={
                    values.status
                      ? {
                          value: values.status,
                          label: getBoardStatus(values.status).title,
                          color: getBoardStatus(values.status).color
                        }
                      : {
                          value: 'notInitiated',
                          label: 'NÃO INICIADO',
                          color: '#DA5757'
                        }
                  }
                  setData={setStatus}
                />
              </div>
            </S.Right>
            <div style={{ cursor: `${permited ? 'pointer' : 'not-allowed'}` }}>
              <SelectComponent
                defaultOption={
                  values.sprint
                    ? {
                        label: getLabelPathWithId(values.sprint),
                        value: values.sprint
                      }
                    : {
                        label: getLabelPathWithId(activeProject.id),
                        value: activeProject.id
                      }
                }
                placeholder="Selecione um destino"
                customStyle={colourStylesStatusResponsible}
                label="Destino"
                options={pathOptions}
                setData={setPath}
                isDisabled={!permited}
              />
            </div>
            <div style={{ cursor: `${permited ? 'pointer' : 'not-allowed'}` }}>
              <SelectComponent
                isSearchable={true}
                SingleValue={SingleValueResponsible}
                defaultOption={
                  values.responsible.name
                    ? {
                        label: values.responsible.name,
                        value: values.responsible.id
                      }
                    : undefined
                }
                placeholder="Selecione um responsável"
                customStyle={colourStylesStatusResponsible}
                label="Responsável"
                options={users}
                setData={setResponsible}
                isDisabled={!permited}
              />
            </div>
            <div>
              <TextField
                name="author"
                label="Autor"
                icon={<Person />}
                disabled
                initialValue={
                  values.author.name ? values.author.name : user.name
                }
                error={fieldError?.name}
                onInputChange={(v) => handleInput('author', v)}
                style={{ height: '34px' }}
              />
            </div>
            <S.Dates>
              {values.createdDate && (
                <div>
                  <span>Criado em: {values.createdDate}</span>
                </div>
              )}
              {values.conclusionDate && (
                <div>
                  <span>Concluído em: {values.conclusionDate}</span>
                </div>
              )}
            </S.Dates>
          </S.Select>
        </S.Right>
      </S.Content>
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
          onClick={option == 'create' ? createBoard : editBoard}
        >
          {option == 'create' ? 'Criar board' : 'Editar board'}
        </Button>
      </S.ButtonContainer>
    </Container>
  )
}

export default FormBoard
