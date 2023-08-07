import * as React from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { StyledTableCell } from './styles'
import { Dialog, Icon, TableFooter, TablePagination } from '@mui/material'
import TablePaginationActions from './TablePagination'
import Button from 'components/Button'

import AddIcon from '@mui/icons-material/Add'

import { AiOutlineCheck } from 'react-icons/ai'
import { ProjectUserRoleType } from 'templates/Projects'
import { projectsToTableMapper, usersToSelectMapper } from 'utils/mappers'
import { Session } from 'next-auth'

import {
  MutationDeleteProjectUserRole,
  MutationDeleteProjectUserRoleVariables
} from 'graphql/generated/MutationDeleteProjectUserRole'
import { MUTATION_DELETE_PROJECT_USER_ROLE } from 'graphql/mutations/projectUserRole'
import {
  MutationActiveProject,
  MutationActiveProjectVariables
} from 'graphql/generated/MutationActiveProject'
import { MUTATION_ACTIVE_PROJECT } from 'graphql/mutations/user'
import FormProject, { FormProjectProps } from 'components/FormProject'

import { QueryAllUsers } from 'graphql/generated/QueryAllUsers'
import { QUERY_ALL_USERS } from 'graphql/queries/user'

import { useLazyQuery, useMutation } from '@apollo/client'
import {
  QueryProject,
  QueryProjectVariables
} from 'graphql/generated/QueryProject'
import { QUERY_PROJECT } from 'graphql/queries/project'
import {
  MutationDeleteProject,
  MutationDeleteProjectVariables
} from 'graphql/generated/MutationDeleteProject'
import { MUTATION_DELETE_PROJECT } from 'graphql/mutations/project'
import Confirm from 'components/Confirm'

export type User = {
  id: string
  activeProjectId: string
  name: string
}

type Project = {
  id: string
  name: string | undefined
}

export type ProjectUserRoleTableProps = {
  projectUserRoleTables: ProjectUserRoleType[]
  session: Session
  setQuantityProjectsPage: (quantity: number) => void
  user: User
  setActiveProjectSideBar: (project: Project | null) => void
}

export default function CustomizedTables({
  projectUserRoleTables,
  session,
  setQuantityProjectsPage,
  user,
  setActiveProjectSideBar
}: ProjectUserRoleTableProps) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [projects, setProjects] = React.useState(projectUserRoleTables)
  const [projectToRemoveId, setProjectToRemoveId] = React.useState<string>()
  const [activeProjectId, setActiveProjectId] = React.useState(
    user.activeProjectId
  )
  const [openModal, setOpenModal] = React.useState(false)
  const [openModalDelete, setOpenModalDelete] = React.useState(false)

  const modalProjectPropsDefault = {
    nameProject: '',
    closeModal: () => setOpenModal(false),
    usersOptions: [{ label: '', value: '' }],
    user: user,
    session: session,
    scrumMastersReceived: [],
    productOwnersReceived: [],
    membersReceived: [],
    projectUserRoleTables: projects,
    setProjects,
    setQuantityProjectsPage,
    activeProjectId,
    setActiveProjectSideBar
  }

  const [propsModalProject, setPropsModalProject] =
    React.useState<FormProjectProps>(modalProjectPropsDefault)

  const [usersOptions, setUsersOptions] = React.useState([])

  const [getAllUsers, { data: QueryAllUsers }] = useLazyQuery<QueryAllUsers>(
    QUERY_ALL_USERS,
    {
      context: { session },
      onCompleted: () => {
        const propsModalProjectNew = modalProjectPropsDefault
        propsModalProjectNew.usersOptions = usersToSelectMapper(
          QueryAllUsers?.usersPermissionsUsers?.data || []
        )
        setPropsModalProject(propsModalProjectNew)
      }
    }
  )

  const createProject = async () => {
    await getAllUsers({
      variables: {},
      fetchPolicy: 'no-cache'
    })
    setOpenModal(true)
    setPage(0)
  }

  const [getProject, { data: QueryProject }] = useLazyQuery<
    QueryProject,
    QueryProjectVariables
  >(
    QUERY_PROJECT,

    {
      context: { session },
      onCompleted: () => {
        const propsModalProjectNew = propsModalProject
        propsModalProjectNew.nameProject =
          QueryProject?.project?.data?.attributes?.name
        propsModalProjectNew.option = 'edit'

        QueryProject?.project?.data?.attributes?.projectUserRoles?.data.map(
          (p) => {
            switch (p.attributes?.role) {
              case 'scrumMaster': {
                propsModalProjectNew.scrumMastersReceived =
                  propsModalProjectNew.scrumMastersReceived.concat([
                    {
                      label: `${p.attributes.user?.data?.attributes?.username}`,
                      value: `${p.attributes.user?.data?.id}`
                    }
                  ])
                return
              }
              case 'productOwner': {
                propsModalProjectNew.productOwnersReceived =
                  propsModalProjectNew.productOwnersReceived.concat([
                    {
                      label: `${p.attributes.user?.data?.attributes?.username}`,
                      value: `${p.attributes.user?.data?.id}`
                    }
                  ])
                return
              }
              case 'member': {
                propsModalProjectNew.membersReceived =
                  propsModalProjectNew.membersReceived.concat([
                    {
                      label: `${p.attributes.user?.data?.attributes?.username}`,
                      value: `${p.attributes.user?.data?.id}`
                    }
                  ])
                return
              }
            }
          }
        )
        propsModalProjectNew.editProjectId = QueryProject?.project?.data?.id
        setPropsModalProject(propsModalProjectNew)
      }
    }
  )

  const editProject = async (id: string) => {
    await getAllUsers({
      variables: {},
      fetchPolicy: 'no-cache'
    })
    await getProject({
      variables: {
        id: id
      },
      fetchPolicy: 'no-cache'
    })
    setOpenModal(true)
    setPage(0)
  }

  const [removeProjectGraphql, { data }] = useMutation<
    MutationDeleteProject,
    MutationDeleteProjectVariables
  >(MUTATION_DELETE_PROJECT, {
    context: { session },
    onCompleted: () => {
      const projectsNew = projects.filter((p) => {
        if (p.project.id != data?.deleteProject?.data?.id) {
          return p
        }
      })

      setProjects(projectsNew)
      setQuantityProjectsPage(projectsNew.length)
      if (activeProjectId == data?.deleteProject?.data?.id) {
        setActiveProjectId('')
        setActiveProjectSideBar(null)
      }
    }
  })

  const removeProject = (id: string) => {
    removeProjectGraphql({
      variables: {
        id: id
      }
    })

    setOpenModalDelete(false)
  }

  const [activeProjectGraphql, { data: dataActive }] = useMutation<
    MutationActiveProject,
    MutationActiveProjectVariables
  >(MUTATION_ACTIVE_PROJECT, {
    context: { session },
    onCompleted: () => {
      setActiveProjectSideBar({
        id: dataActive?.updateUsersPermissionsUser.data?.attributes
          ?.activeProject?.data?.id
          ? dataActive?.updateUsersPermissionsUser.data?.attributes
              ?.activeProject?.data?.id
          : '',
        name: dataActive?.updateUsersPermissionsUser.data?.attributes
          ?.activeProject?.data?.attributes?.name
      })
      setActiveProjectId(
        dataActive?.updateUsersPermissionsUser.data?.attributes?.activeProject
          ?.data?.id || ''
      )
      setPage(0)
    }
  })

  const activeProject = (id: string) => {
    activeProjectGraphql({
      variables: {
        idProject: id,
        idUser: user.id
      }
    })
  }

  const removeProjectSelect = (id: string) => {
    setOpenModalDelete(true)
    setProjectToRemoveId(id)
  }

  const tableData = projectsToTableMapper(
    projects,
    editProject,
    removeProjectSelect,
    activeProject,
    activeProjectId
  )

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
    overlay: {
      // background: '#F2F2F2'
    }
  }

  const handleClose = (event: React.MouseEventHandler, reason: string) => {
    if (reason && reason == 'backdropClick') return
    setOpenModal(false)
  }

  return (
    <>
      <Dialog
        open={openModalDelete}
        fullWidth={true}
        maxWidth="xs"
        onClose={handleClose}
      >
        <Confirm
          buttonLabel="Deletar"
          message="Você tem certeza que deseja deletar esse projeto?"
          closeModal={() => setOpenModalDelete(false)}
          actionFunction={() => removeProject(projectToRemoveId || '')}
        />
      </Dialog>
      <Dialog
        open={openModal}
        fullWidth={true}
        maxWidth="xs"
        onClose={handleClose}
      >
        <FormProject {...propsModalProject} />
      </Dialog>
      <Button
        size="small"
        icon={<AddIcon />}
        style={{ marginBottom: '10px' }}
        onClick={createProject}
      >
        Criar um projeto
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Nome</StyledTableCell>
              <StyledTableCell align="center">Papel</StyledTableCell>
              <StyledTableCell align="center">Ativo</StyledTableCell>
              <StyledTableCell align="center">Opções</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tableData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableData
            ).map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell style={{}} align="center">
                  {row.role}
                </StyledTableCell>
                <StyledTableCell style={{}} align="center">
                  {row.active ? (
                    <AiOutlineCheck size={20} color="#00cc1a" />
                  ) : (
                    <></>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">{row.options}</StyledTableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/* <TablePagination
      sx={{
        '.MuiTablePagination-toolbar': {
          fontSize: '16px'
        }
      }}
      labelRowsPerPage={
        <div style={{ fontSize: 14 }}>Projetos por pagina</div>
      }
      rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
      colSpan={rows.length}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: {
          'aria-label': 'rows per page'
        },
        native: true
      }}
      style={{ fontSize: '16px' }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    /> */}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
