import { Container } from 'components/Container'
import * as S from './styles'
import Heading from 'components/Heading'

import Button from 'components/Button'
import SelectChips from 'components/SelectChips'

import { useState } from 'react'
import { MultiValue } from 'react-select'
import { OptionType } from '@atlaskit/select'
import { SelectValue } from 'components/FormProject'
import { User } from 'templates/ProductBacklog'

export type FormCategoriesProps = {
  closeModal: () => void
  categoriesOptions: MultiValue<OptionType>
  categoriesOfKnowledge: SelectValue
  handleInput: (
    field: string,
    value: string | null | User | number | User[]
  ) => void
}

const FormCategories = ({
  closeModal,
  categoriesOptions,
  categoriesOfKnowledge,
  handleInput
}: FormCategoriesProps) => {
  const [categories, setCategories] =
    useState<MultiValue<OptionType>>(categoriesOptions)
  const [categoriesOfKnowledgeData, setCategoriesOfKnowledgeData] =
    useState<SelectValue>(categoriesOfKnowledge)

  const editUsers = () => {
    //
  }

  const setDataCategories = (value: MultiValue<OptionType>) => {
    setCategoriesOfKnowledgeData(
      value.map((user) => {
        return {
          label: `${user.label}`,
          value: `${user.value}`
        }
      })
    )
  }
  return (
    <Container>
      <S.Heading>
        <Heading lineBottom color="black" size="small">
          Categorias do documento
        </Heading>
      </S.Heading>

      <S.Content>
        <SelectChips
          setData={setDataCategories}
          defaultValues={categoriesOfKnowledgeData}
          options={categories}
          maxMenuHeight={150}
          placeholder="Selecione"
          isCreatable={true}
        />
        <S.ButtonContainer>
          <S.Info>
            Atenção: So será feita a alteração clicando no botao &quot;Editar
            documento&quot;
          </S.Info>
          <S.Button>
            <Button
              minimal
              size="small"
              // style={{ marginBottom: '10px' }}
              onClick={closeModal}
            >
              Cancelar
            </Button>
          </S.Button>
          <S.Button>
            <Button
              size="small"
              // style={{ marginBottom: '10px' }}
              onClick={() => {
                handleInput(
                  'categories',
                  categoriesOfKnowledgeData.map((u) => ({
                    id: u.value,
                    name: u.label
                  }))
                )
                closeModal()
              }}
            >
              Salvar
            </Button>
          </S.Button>
        </S.ButtonContainer>
      </S.Content>
    </Container>
  )
}

export default FormCategories
