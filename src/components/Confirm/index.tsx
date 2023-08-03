import Button from 'components/Button'
import Heading from 'components/Heading'

import * as S from './styles'
import { Container } from 'components/Container'

export type ConfirmProps = {
  message: string
  buttonLabel: string
  closeModal: () => void
  actionFunction: () => void
}

const FormProject = ({
  message,
  buttonLabel,
  closeModal,
  actionFunction
}: ConfirmProps) => {
  return (
    <>
      <Container>
        <S.Heading>
          <Heading lineBottom color="black" size="small">
            {message}
          </Heading>
        </S.Heading>

        <S.Content>
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
              onClick={actionFunction}
            >
              {buttonLabel}
            </Button>
          </S.ButtonContainer>
        </S.Content>
      </Container>
    </>
  )
}

export default FormProject
