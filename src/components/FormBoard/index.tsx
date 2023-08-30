import { Container } from 'components/Container'
import * as S from './styles'
import Heading from 'components/Heading'
import { FormError } from 'components/Form'
import { ErrorOutline } from '@styled-icons/material-outlined'
import SelectChips from 'components/SelectChips'
import Button from 'components/Button'
import { useState } from 'react'
import TextField from 'components/TextField'
import { FieldErrors } from 'utils/validations'
import { Board, User } from 'templates/ProductBacklog'
import SelectComponent, { OptionType } from 'components/Select'
import {
  Option,
  SingleValue,
  colourStylesStatus,
  defaultOption,
  options
} from 'components/Select/configSelectStatus'

import {
  Option as OptionResponsible,
  SingleValue as SingleValueResponsible,
  colourStylesStatus as colourStylesStatusResponsible
} from 'components/Select/configSelectResponsible'

import { WatchLater } from '@styled-icons/material-outlined/WatchLater'
import { Person } from '@styled-icons/material-outlined/Person'
import { getBoardStatus } from 'utils/mappers'
import { Project } from 'templates/Projects'

export type FormBoardProps = {
  initialBoard: Board
  closeModal: () => void
  activeProject: Project
  usersOptions: OptionType[]
  pathOptions: OptionType[]
  user: User
  option?: 'create' | 'edit'
}

const FormBoard = ({
  initialBoard,
  closeModal,
  activeProject,
  usersOptions,
  pathOptions,
  user,
  option = 'create'
}: FormBoardProps) => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [users, setUsers] = useState<OptionType[]>(usersOptions)
  const [values, setValues] = useState<Board>({
    id: initialBoard.id,
    title: initialBoard.title,
    timeEstimated: initialBoard.timeEstimated,
    description: initialBoard.description,
    author: {
      id: initialBoard.author.id,
      name: initialBoard.author.name
    },
    responsible: {
      id: initialBoard.responsible.id,
      name: initialBoard.responsible.name
    },
    sprint: initialBoard.sprint,
    status: initialBoard.status
  })

  const createBoard = () => {
    //
  }

  const editBoard = () => {
    //
  }

  const handleInput = (value: string) => {
    //
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
        <div style={{ marginRight: '30px' }}>
          <TextField
            name="title"
            placeholder="Titulo"
            label="Titulo"
            initialValue={values.title}
            // error={fieldError?.name}
            onInputChange={(v) => handleInput(v)}
            style={{ height: '30px' }}
          />
        </div>
        <S.Right>
          <S.Select>
            <S.Right>
              <TextField
                name="timeEstimated"
                label="Horas"
                icon={<WatchLater />}
                initialValue={`${values.timeEstimated}`}
                // error={fieldError?.name}
                // onInputChange={(v) => handleInput(v)}
                style={{ height: '34px', width: '72px' }}
              />
              <div style={{ marginLeft: '30px', width: '200px' }}>
                <SelectComponent
                  Option={Option}
                  SingleValue={SingleValue}
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
                />
              </div>
            </S.Right>
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
            />
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
            />
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
                onInputChange={(v) => handleInput(v)}
                style={{ height: '34px' }}
              />
            </div>
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
