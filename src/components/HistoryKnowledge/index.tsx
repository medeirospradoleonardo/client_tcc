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
    const d = new Date(date),
      year = d.getFullYear()
    let day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1)

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [day, month, year]
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
          <div
            key={`historyKnowledge-${formatDate(new Date(s.date))}-${index}`}
          >
            <S.ContainerStory>
              <S.Date>{formatDate(new Date(s.date))} </S.Date>
              <S.Author>
                {index == 0 ? 'Criado por' : 'Editado por'} {s.author}
              </S.Author>
            </S.ContainerStory>
          </div>
        ))}
      </S.Content>
    </Container>
  )
}

export default HistoryKnowledge
