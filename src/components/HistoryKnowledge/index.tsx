import { Container } from 'components/Container'
import * as S from './styles'
import Heading from 'components/Heading'

import Button from 'components/Button'
import { Story } from 'templates/KnowledgeBase'

export type HistoryKnowledgeProps = {
  closeModal: () => void
  stories: Story[]
}

const HistoryKnowledge = ({ closeModal, stories }: HistoryKnowledgeProps) => {
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  function formatDate(date: Date) {
    return [
      padTo2Digits(date.getDate() + 1),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ]
      .join('/')
      .concat(
        ` ${padTo2Digits(date.getHours())}:${padTo2Digits(
          date.getMinutes()
        )}:${padTo2Digits(date.getSeconds())}`
      )
  }

  return (
    <Container style={{ maxHeight: '500px' }}>
      <S.Heading>
        <S.Left>
          <Heading lineBottom color="black" size="small">
            Histórico de edição
          </Heading>
        </S.Left>
        <S.Right>
          <Button
            minimal
            size="small"
            style={{ marginBottom: '10px' }}
            onClick={closeModal}
          >
            Fechar
          </Button>
        </S.Right>
      </S.Heading>

      <S.Content>
        {stories.map((s, index) => (
          <>
            <S.ContainerStory key={`${formatDate(new Date(s.date))}-${index}`}>
              <S.Date>{formatDate(new Date(s.date))} </S.Date>
              <S.Author>
                {index == 0 ? 'Criado por' : 'Editado por'} {s.author}
              </S.Author>
            </S.ContainerStory>
          </>
        ))}
      </S.Content>
    </Container>
  )
}

export default HistoryKnowledge
