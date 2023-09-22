import Heading from 'components/Heading'
import { Container } from 'components/Container'
import * as S from './styles'
import Base from 'templates/Base'
import { Project, ProjectsTemplateProps } from 'templates/Projects'
import TextField from 'components/TextField'
import Confirm from 'components/Confirm'
import { Search } from '@styled-icons/material-outlined/Search'
import { User } from 'templates/ProductBacklog'
import Knowledge from 'components/Knowledge'
import Button from 'components/Button'
import { useState } from 'react'
import FormKnowledge, { FormKnowledgeProps } from 'components/FormKnowledge'
import { useLazyQuery, useMutation } from '@apollo/client'
import { QueryGetKnowledge } from 'graphql/generated/QueryGetKnowledge'
import { QUERY_GET_KNOWLEDGE } from 'graphql/queries/knowledge'
import { Session } from 'next-auth'
import { Grid } from 'components/Grid'
import { Dialog } from '@mui/material'
import { MUTATION_DELETE_KNOWLEDGE } from 'graphql/mutations/knowledge'

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
  const [openModalDeleteKnowledge, setOpenModalDeleteKnowledge] =
    useState(false)
  const [knowledgesData, setKnowledgesData] = useState(knowledges)
  const [knowledgeToRemoveId, setKnowledgeToRemoveId] = useState<string>()

  const handleClose = (event: React.MouseEventHandler, reason: string) => {
    if (reason && reason == 'backdropClick') return
    setOpenModalDeleteKnowledge(false)
  }

  const removeKnowledgeSelect = (id: string) => {
    setOpenModalDeleteKnowledge(true)
    setKnowledgeToRemoveId(id)
  }

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

  const [deleteKnowledgeGraphQL] = useMutation(MUTATION_DELETE_KNOWLEDGE, {
    context: { session },
    onCompleted: (data) => {
      let knowledgesDataNew = knowledgesData?.slice()
      knowledgesDataNew = knowledgesDataNew?.filter(
        (k) => k.id != data.deleteKnowledge.data.id
      )
      setKnowledgesData(knowledgesDataNew)
      setOpenModalDeleteKnowledge(false)
    }
  })

  const deleteKnowledge = (id: string) => {
    deleteKnowledgeGraphQL({
      variables: {
        id: id
      }
    })
  }

  return (
    <Base
      projectsQuantity={projectUserRoles?.length}
      activeProject={activeProject}
    >
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={openModalDeleteKnowledge}
        onClose={handleClose}
      >
        <Confirm
          closeModal={() => setOpenModalDeleteKnowledge(false)}
          buttonLabel="Deletar"
          message="Você tem certeza que deseja deletar esse documento?"
          actionFunction={() => deleteKnowledge(knowledgeToRemoveId || '')}
        />
      </Dialog>
      <Container>
        <Heading lineLeft lineColor="secondary" color="black">
          Base de conhecimento
        </Heading>

        <S.Main>
          <S.Content>
            {!openForm ? (
              <>
                <TextField icon={<Search />} />
                <Button
                  style={{ marginTop: '10px' }}
                  size="small"
                  onClick={createKnowledge}
                >
                  Criar documento
                </Button>
                <Grid>
                  {knowledgesData.map((knowledge) => (
                    <Knowledge
                      permited={true}
                      key={knowledge.id}
                      id={knowledge.id}
                      title={knowledge.title}
                      author={knowledge.author.name}
                      editKnowledge={editKnowledge}
                      deleteKnowledge={removeKnowledgeSelect}
                    />
                  ))}
                </Grid>
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
