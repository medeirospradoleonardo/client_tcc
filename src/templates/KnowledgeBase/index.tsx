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
import {
  QUERY_GET_KNOWLEDGE,
  QUERY_GET_KNOWLEDGES
} from 'graphql/queries/knowledge'
import { Session } from 'next-auth'
import { Grid } from 'components/Grid'
import { Dialog } from '@mui/material'
import { MUTATION_DELETE_KNOWLEDGE } from 'graphql/mutations/knowledge'
import { QueryGetKnowledges } from 'graphql/generated/QueryGetKnowledges'
import { knowledgesMapper } from 'utils/mappers'

export type Story = {
  author: string
  date: string
}

export type Category = {
  id: string
  name: string
}

export type Knowledge = {
  id: string
  title: string
  content?: string
  author: User
  usersCanEdit: User[] | null
  categories: Category[] | null
  stories: Story[] | null
}

export type KnowledgeBaseTemplateProps = {
  isAdmin: boolean
  user: User
  session: Session
  projectUserRoles: ProjectsTemplateProps[]
  activeProject: Project
  knowledges: Knowledge[]
  knowledgesTotal: number
  itemsPerPage: number
}

const KnowledgeBase = ({
  isAdmin,
  user,
  session,
  projectUserRoles,
  activeProject,
  knowledges,
  knowledgesTotal,
  itemsPerPage
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
    permited: true,
    isAdmin: isAdmin,
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
        id: user.id,
        name: user.name
      },
      usersCanEdit: [] as User[],
      categories: [] as Category[],
      stories: [] as Story[]
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
        const getPermited = () => {
          if (isAdmin) {
            return true
          } else {
            if (
              user.id ==
              dataQueryKnowledge?.knowledge?.data?.attributes?.author?.data?.id
            ) {
              return true
            } else {
              if (
                dataQueryKnowledge?.knowledge?.data?.attributes?.usersCanEdit?.data?.find(
                  (u) => user.id == u.id
                )
              ) {
                return true
              } else {
                return false
              }
            }
          }
        }
        propsFormKnowledgeNew.permited = getPermited()

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
          usersCanEdit: dataQueryKnowledge?.knowledge?.data?.attributes
            ?.usersCanEdit?.data
            ? dataQueryKnowledge?.knowledge?.data?.attributes?.usersCanEdit?.data?.map(
                (u) => ({
                  id: u?.id || '',
                  name: u?.attributes?.username || ''
                })
              )
            : [],
          categories: dataQueryKnowledge?.knowledge?.data?.attributes
            ?.categories?.data
            ? dataQueryKnowledge?.knowledge?.data?.attributes?.categories?.data?.map(
                (category) => ({
                  id: category.id || '',
                  name: category.attributes?.name || ''
                })
              )
            : [],
          stories: dataQueryKnowledge?.knowledge?.data?.attributes?.stories
            ?.data
            ? dataQueryKnowledge?.knowledge?.data?.attributes?.stories?.data?.map(
                (story) => ({
                  author: story.attributes?.author || '',
                  date: story.attributes?.date || ''
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

  const [getKnowledgesGraphql, { data: dataQueryKnowledges }] =
    useLazyQuery<QueryGetKnowledges>(QUERY_GET_KNOWLEDGES, {
      context: { session },
      onCompleted: () => {
        setKnowledgesData(knowledgesMapper(dataQueryKnowledges?.knowledges))
        // if (dataQueryKnowledges?.knowledges) {
        //   if (knowledgesMapper(dataQueryKnowledges?.knowledges)) {
        //     setKnowledgesData(knowledgesMapper(dataQueryKnowledges?.knowledges))
        //   }
        // }
      }
    })

  const [pageActive, setPageActive] = useState(0)
  const [pageCount, setPageCount] = useState(
    Math.ceil(knowledgesTotal / itemsPerPage)
  )

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    // const newOffset = (event.selected * itemsPerPage) % knowledgesTotal
    // console.log(event.selected)
    // setItemOffset(newOffset)
    setPageActive(event.selected)
    getKnowledgesGraphql({
      variables: {
        page: event.selected + 1,
        pageSize: itemsPerPage
      },
      fetchPolicy: 'no-cache'
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
                <Heading
                  size="small"
                  lineLeft
                  lineColor="secondary"
                  color="black"
                >
                  {knowledgesData.length} documentos
                </Heading>
                <Grid>
                  {knowledgesData.map((knowledge) => (
                    <Knowledge
                      permited={isAdmin || user.id == knowledge.author.id}
                      key={knowledge.id}
                      id={knowledge.id}
                      title={knowledge.title}
                      author={knowledge.author.name}
                      editKnowledge={editKnowledge}
                      deleteKnowledge={removeKnowledgeSelect}
                    />
                  ))}
                </Grid>
                <S.Footer>
                  <S.Right>
                    <S.StyledReactPaginate
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      breakLabel="..."
                      previousLabel="<<"
                      nextLabel=">>"
                      breakClassName="break-me"
                      breakLinkClassName="page-link"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      activeClassName="active"
                      initialPage={pageActive}
                    />
                  </S.Right>
                </S.Footer>
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
