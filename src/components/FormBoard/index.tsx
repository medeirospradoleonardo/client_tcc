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
import { Board } from 'templates/ProductBacklog'
import SelectComponent from 'components/Select'

export type FormBoardProps = {
  initialBoard: Board
  closeModal: () => void
  option?: 'create' | 'edit'
}

const FormBoard = ({
  initialBoard,
  closeModal,
  option = 'create'
}: FormBoardProps) => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const createBoard = () => {
    //
  }

  const editBoard = () => {
    //
  }

  const handleInput = (value: string) => {
    //
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
            // initialValue={name}
            error={fieldError?.name}
            onInputChange={(v) => handleInput(v)}
            style={{ height: '30px' }}
          />
        </div>
        <S.Right>
          <S.Select>
            <SelectComponent label="Status" />
            <SelectChips
              isMulti={false}
              label="Responsável"
              setData={() => console.log()}
              defaultValues={[]}
              options={[
                { label: 'Nao iniciado', value: 'notInitiated' },
                { label: 'Em progresso', value: 'inProgress' },
                { label: 'Concluído', value: 'concluded' }
              ]}
              maxMenuHeight={250}
              placeholder="Selecione um responsável"
            />
            <TextField
              name="timeEstimated"
              placeholder="Tempo estimado (em horas)"
              label="Tempo estimado (em horas)"
              // initialValue={name}
              error={fieldError?.name}
              onInputChange={(v) => handleInput(v)}
              style={{ height: '30px' }}
            />
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
