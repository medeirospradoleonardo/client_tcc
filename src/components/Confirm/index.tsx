import Button from 'components/Button'
import Heading from 'components/Heading'

import * as S from './styles'
import { Container } from 'components/Container'

export type ConfirmProps = {
  message: string
  buttonLabel: string
  closeModal: () => void
  actionFunction: () => void
  cancelButton?: boolean
}

const FormProject = ({
  message,
  buttonLabel,
  closeModal,
  actionFunction,
  cancelButton = true
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
            {cancelButton && (
              <Button
                minimal
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={closeModal}
              >
                Cancelar
              </Button>
            )}
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
