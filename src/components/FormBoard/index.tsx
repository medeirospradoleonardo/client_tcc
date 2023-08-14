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

export type FormBoardProps = {
  closeModal: () => void
  option?: 'create' | 'edit'
}

const FormBoard = ({ closeModal, option = 'create' }: FormBoardProps) => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const createBoard = () => {}

  const editBoard = () => {}

  const handleInput = (value: string) => {}
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
        <TextField
          name="name"
          placeholder="Nome do projeto"
          label="Nome do projeto"
          // initialValue={name}
          error={fieldError?.name}
          onInputChange={(v) => handleInput(v)}
          style={{ height: '30px' }}
        />
        {/* <S.Select>
          <SelectChips
            label="Scrum Master"
            setData={setDataScrumMaster}
            defaultValues={scrumMasters}
            options={users}
            maxMenuHeight={250}
            placeholder="Selecione um Scrum Master para o projeto"
          />
          <SelectChips
            label="Product Owner"
            setData={setDataProductOwner}
            defaultValues={productOwners}
            options={users}
            maxMenuHeight={160}
            placeholder="Selecione um Product Owner para o projeto"
          />
          <SelectChips
            label="Membro"
            setData={setDataMembers}
            defaultValues={members}
            options={users}
            placeholder="Selecione um Membro para o projeto"
          />
        </S.Select> */}
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
      </S.Content>
    </Container>
  )
}

export default FormBoard
