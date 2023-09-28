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
import { useEffect, useState } from 'react'
import FormKnowledge, { FormKnowledgeProps } from 'components/FormKnowledge'
import { useLazyQuery, useMutation } from '@apollo/client'
import { QueryGetKnowledge } from 'graphql/generated/QueryGetKnowledge'
import {
  QUERY_GET_KNOWLEDGE,
  QUERY_GET_KNOWLEDGES,
  QUERY_GET_KNOWLEDGES_TOTAL
} from 'graphql/queries/knowledge'
import { Session } from 'next-auth'
import { Grid } from 'components/Grid'
import { Dialog } from '@mui/material'
import { MUTATION_DELETE_KNOWLEDGE } from 'graphql/mutations/knowledge'
import { QueryGetKnowledges } from 'graphql/generated/QueryGetKnowledges'
import { knowledgesMapper } from 'utils/mappers'
import Radio from 'components/Radio'
import SelectChips from 'components/SelectChips'
import { QueryGetKnowledgesTotal } from 'graphql/generated/QueryGetKnowledgesTotal'
import { MultiValue } from 'react-select'
import { OptionType } from '@atlaskit/select'
import { title } from 'process'

export type Story = {
  author: string
  date: string
}

export type Category = {
  id: string
  name: string
}

type KnowledgeBaseValues = {
  title: string
  categories: string[] | null
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
  const [total, setTotal] = useState(knowledgesTotal)
  const [knowledgeToRemoveId, setKnowledgeToRemoveId] = useState<string>()
  const [sort, setSort] = useState<string>('asc')

  const [pageActive, setPageActive] = useState(0)
  const [pageCount, setPageCount] = useState(Math.ceil(total / itemsPerPage))

  const [values, setValues] = useState<KnowledgeBaseValues>({
    title: '',
    categories: []
  })

  useEffect(() => {
    setPageCount(Math.ceil(total / itemsPerPage))
  }, [total, itemsPerPage])

  const handleClose = (event: React.MouseEventHandler, reason: string) => {
    if (reason && reason == 'backdropClick') return
    setOpenModalDeleteKnowledge(false)
  }

  const removeKnowledgeSelect = (id: string) => {
    setOpenModalDeleteKnowledge(true)
    setKnowledgeToRemoveId(id)
  }

  const refreshKnowledges = async ({
    page = pageActive + 1,
    pageSize = itemsPerPage,
    sortParam = sort,
    title = values.title,
    categories = values.categories
  }) => {
    if (sortParam != sort || title != values.title) {
      setSort(sortParam)
      setPageActive(0)
      page = 1
    }

    await getKnowledgesGraphql({
      variables: {
        page: page,
        pageSize: pageSize,
        sort: `title:${sortParam}`,
        title: title,
        categories: categories
      },
      fetchPolicy: 'no-cache'
    })
    await getKnowledgeTotalGraphQL({
      variables: {
        title: title,
        categories: categories
      },
      fetchPolicy: 'no-cache'
    })
  }

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))

    field == 'title' &&
      refreshKnowledges({
        title: value
      })

    // field == 'categories' &&
    // refreshKnowledges({
    //   categories: value
    // })
  }

  const setData = (value: MultiValue<OptionType>) => {
    setValues((s) => ({
      ...s,
      ['categories']: value.map((category) => `${category.value}`)
    }))

    // refreshKnowledges({
    //     categories: value.map((category) => `${category.value}`)
    //   })
  }

  const formKnowledgePropsDefault = {
    permited: true,
    isAdmin: isAdmin,
    user,
    refreshKnowledges: () => refreshKnowledges({}),
    session: session,
    option: 'create',
    closeForm: () => setOpenForm(false),
    addTotal: () => setTotal(total + 1),
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

  const [getKnowledgeTotalGraphQL, { data: dataQueryKnowledgeTotal }] =
    useLazyQuery<QueryGetKnowledgesTotal>(QUERY_GET_KNOWLEDGES_TOTAL, {
      context: { session },
      onCompleted: () => {
        dataQueryKnowledgeTotal?.knowledges?.meta.pagination.total &&
          setTotal(dataQueryKnowledgeTotal?.knowledges?.meta.pagination.total)
      }
    })

  const [deleteKnowledgeGraphQL] = useMutation(MUTATION_DELETE_KNOWLEDGE, {
    context: { session },
    onCompleted: () => {
      refreshKnowledges({})
      setOpenModalDeleteKnowledge(false)
    }
  })

  const deleteKnowledge = async (id: string) => {
    await deleteKnowledgeGraphQL({
      variables: {
        id: id
      }
    })
  }

  const [getKnowledgesGraphql, { data: dataQueryKnowledges }] =
    useLazyQuery<QueryGetKnowledges>(QUERY_GET_KNOWLEDGES, {
      context: { session },
      onCompleted: () => {
        dataQueryKnowledges?.knowledges &&
          setKnowledgesData(knowledgesMapper(dataQueryKnowledges?.knowledges))
      }
    })

  const handlePageClick = (event: any) => {
    setPageActive(event.selected)
    refreshKnowledges({
      page: event.selected + 1
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
                <S.Body>
                  <S.Heading>
                    <S.Right>
                      <Heading
                        size="small"
                        lineLeft
                        lineColor="secondary"
                        color="black"
                      >
                        {total} documentos encontrados
                      </Heading>
                    </S.Right>
                  </S.Heading>
                  <S.Container>
                    <S.Filters>
                      <Button
                        // style={{ marginTop: '10px', marginBottom: '10px' }}
                        style={{ marginTop: '5px', marginBottom: '50px' }}
                        size="small"
                        onClick={createKnowledge}
                      >
                        Criar documento
                      </Button>
                      <S.Items>
                        <Heading
                          lineBottom
                          lineColor="secondary"
                          size="small"
                          color="black"
                        >
                          Ordenar por
                        </Heading>
                        <Radio
                          id={'asc'}
                          value={'asc'}
                          name={'sort'}
                          label="Ascendente"
                          labelFor="asc"
                          labelColor="black"
                          // defaultChecked={
                          //   String(field.name) === String(values[item.name])
                          // }
                          defaultChecked={sort == 'asc'}
                          // onChange={() => handleRadio(item.name, field.name)}
                          onChange={() => {
                            refreshKnowledges({
                              sortParam: 'asc'
                            })
                          }}
                          style={{ marginBottom: '5px' }}
                        />
                        <Radio
                          id={'desc'}
                          value={'desc'}
                          name={'sort'}
                          label="Decrescente"
                          labelFor="desc"
                          labelColor="black"
                          defaultChecked={sort == 'desc'}
                          // defaultChecked={
                          //   String(field.name) === String(values[item.name])
                          // }
                          // onChange={() => handleRadio(item.name, field.name)}
                          onChange={() => {
                            refreshKnowledges({
                              sortParam: 'desc'
                            })
                          }}
                        />
                      </S.Items>
                      <S.Items>
                        <SelectChips
                          placeholder="Selecione as categorias"
                          isMulti={true}
                          setData={setData}
                        />
                      </S.Items>
                    </S.Filters>
                    <S.Grid>
                      <S.Search>
                        <TextField
                          icon={<Search />}
                          onInputChange={(v) => handleInput('title', v)}
                        />
                      </S.Search>
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
                    </S.Grid>
                  </S.Container>
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
                        forcePage={pageActive}
                      />
                    </S.Right>
                  </S.Footer>
                </S.Body>
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
