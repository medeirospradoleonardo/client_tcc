import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { Project, ProjectsTemplateProps } from 'templates/Projects'
import TextField from 'components/TextField'
import { Search } from '@styled-icons/material-outlined/Search'
import { User } from 'templates/ProductBacklog'
import Knowledge from 'components/Knowledge'
import Button from 'components/Button'
import { useState } from 'react'
import FormKnowledge, { FormKnowledgeProps } from 'components/FormKnowledge'
import { useLazyQuery } from '@apollo/client'
import { QueryGetKnowledge } from 'graphql/generated/QueryGetKnowledge'
import { QUERY_GET_KNOWLEDGE } from 'graphql/queries/knowledge'
import { Session } from 'next-auth'

export type Category = {
  id: string
  name: string
}

export type Knowledge = {
  id: string
  title: string
  content?: string
  categories: Category[] | null
  author: User
}

export type KnowledgeBaseTemplateProps = {
  user: User
  session: Session
  projectUserRoles: ProjectsTemplateProps[]
  activeProject: Project
  knowledges: Knowledge[]
}

const KnowledgeBase = ({
  user,
  session,
  projectUserRoles,
  activeProject,
  knowledges
}: KnowledgeBaseTemplateProps) => {
  const [openForm, setOpenForm] = useState(false)
  const [knowledgesData, setKnowledgesData] = useState(knowledges)

  const refreshKnowledges = (knowledge: Knowledge) => {
    const knowledgesNew = knowledgesData.slice()
    const isEdit = knowledgesNew.find((k) => k.id == knowledge.id)

    isEdit
      ? knowledgesNew.map((k) => {
          if (k.id == knowledge.id) {
            k.title = knowledge.title
          }
        })
      : knowledgesNew.push(knowledge)

    setKnowledgesData(knowledgesNew)
  }

  const formKnowledgePropsDefault = {
    user,
    refreshKnowledges,
    session: session,
    option: 'create',
    closeForm: () => setOpenForm(false),
    initialKnowledge: {
      id: '',
      title: '',
      content: '',
      author: {
        id: '',
        name: ''
      },
      categories: [] as Category[]
    }
  }

  const [propsFormKnowledge, setPropsFormKnowledge] =
    useState<FormKnowledgeProps>(formKnowledgePropsDefault)

  const createKnowledge = () => {
    const propsFormKnowledgeNew = formKnowledgePropsDefault
    setPropsFormKnowledge(propsFormKnowledgeNew)
    setOpenForm(true)
  }

  const [getKnowledgeGraphql, { data: dataQueryKnowledge }] =
    useLazyQuery<QueryGetKnowledge>(QUERY_GET_KNOWLEDGE, {
      context: { session },
      onCompleted: () => {
        const propsFormKnowledgeNew = formKnowledgePropsDefault
        propsFormKnowledgeNew.option = 'edit'
        propsFormKnowledgeNew.initialKnowledge = {
          id: dataQueryKnowledge?.knowledge?.data?.id || '',
          title: dataQueryKnowledge?.knowledge?.data?.attributes?.title || '',
          content:
            dataQueryKnowledge?.knowledge?.data?.attributes?.content || '',
          author: {
            id:
              dataQueryKnowledge?.knowledge?.data?.attributes?.author?.data
                ?.id || '',
            name:
              dataQueryKnowledge?.knowledge?.data?.attributes?.author?.data
                ?.attributes?.username || ''
          },
          categories: dataQueryKnowledge?.knowledge?.data?.attributes
            ?.categories?.data
            ? dataQueryKnowledge?.knowledge?.data?.attributes?.categories?.data?.map(
                (category) => ({
                  id: category.id || '',
                  name: category.attributes?.name || ''
                })
              )
            : []
        }
        setPropsFormKnowledge(propsFormKnowledgeNew)
        setOpenForm(true)
      }
    })

  const editKnowledge = async (id: string) => {
    await getKnowledgeGraphql({
      variables: {
        id: id
      },
      fetchPolicy: 'no-cache'
    })
  }

  return (
    <Base
      projectsQuantity={projectUserRoles?.length}
      activeProject={activeProject}
    >
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Base de conhecimento
        </Heading>

        <S.Main>
          <S.Content>
            {!openForm ? (
              <>
                <TextField icon={<Search />} />
                <Button size="small" onClick={createKnowledge}>
                  Criar documento
                </Button>
                <S.Knowledges>
                  {knowledgesData.map((knowledge) => (
                    <Knowledge
                      permited={true}
                      key={knowledge.id}
                      id={knowledge.id}
                      title={knowledge.title}
                      author={knowledge.author.name}
                      editKnowledge={editKnowledge}
                    />
                  ))}
                </S.Knowledges>
              </>
            ) : (
              <FormKnowledge {...propsFormKnowledge} />
            )}
          </S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default KnowledgeBase
