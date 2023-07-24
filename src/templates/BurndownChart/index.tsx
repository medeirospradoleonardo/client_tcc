import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { ProjectsTemplateProps } from 'templates/Projects'

export type BurndownChartTemplateProps = {
  children: React.ReactNode
  projectUserRoles: ProjectsTemplateProps[]
}

const BurndownChart = ({
  children,
  projectUserRoles
}: BurndownChartTemplateProps) => {
  return (
    <Base projectsQuantity={projectUserRoles?.length}>
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Gráfico Burndown
        </Heading>

        <S.Main>
          <S.Content>{children}</S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default BurndownChart
