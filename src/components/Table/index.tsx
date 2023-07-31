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
import SelectChips from 'components/SelectChips'

import AddIcon from '@mui/icons-material/Add'

import { AiOutlineCheck } from 'react-icons/ai'
import { ProjectUserRoleType } from 'templates/Projects'
import { projectsToTableMapper, usersToSelectMapper } from 'utils/mappers'
import { Session } from 'next-auth'
import { initializeApollo } from 'utils/apollo'
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

type User = {
  id: string
  activeProjectId: string
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
  setActiveProjectSideBar: (project: Project) => void
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
  const [activeProjectId, setActiveProjectId] = React.useState(
    user.activeProjectId
  )
  const [openModal, setOpenModal] = React.useState(false)

  const modalProjectPropsDefault = {
    nameProject: '',
    closeModal: () => setOpenModal(false),
    usersOptions: [{ label: '', value: '' }]
  }

  const [propsModalProject, setPropsModalProject] =
    React.useState<FormProjectProps>(modalProjectPropsDefault)

  const apolloClient = initializeApollo(null, session)

  const [usersOptions, setUsersOptions] = React.useState([])

  const editProject = (id: string) => {
    // router.push('/projects')
    const propsModalProjectNew = propsModalProject
    propsModalProjectNew.nameProject = 'Vale Ouro'
    setPropsModalProject(propsModalProjectNew)
    setOpenModal(true)
    setPage(0)
  }

  const removeProject = async (id: string) => {
    const { errors } = await apolloClient.mutate<
      MutationDeleteProjectUserRole,
      MutationDeleteProjectUserRoleVariables
    >({
      mutation: MUTATION_DELETE_PROJECT_USER_ROLE,
      variables: {
        id: id
      }
    })

    if (errors == null) {
      projectUserRoleTables = projectUserRoleTables.filter((p) => {
        if (p.id != id) {
          return p
        }
      })

      setProjects(projectUserRoleTables)
      setQuantityProjectsPage(projectUserRoleTables.length)
    }
  }

  const activeProject = async (id: string) => {
    const { data, errors } = await apolloClient.mutate<
      MutationActiveProject,
      MutationActiveProjectVariables
    >({
      mutation: MUTATION_ACTIVE_PROJECT,
      variables: {
        idProject: id,
        idUser: user.id
      }
    })

    if (errors == null) {
      setActiveProjectId(id)
      setActiveProjectSideBar({
        id: data?.updateUsersPermissionsUser.data?.attributes?.activeProject
          ?.data?.id
          ? data?.updateUsersPermissionsUser.data?.attributes?.activeProject
              ?.data?.id
          : '',
        name: data?.updateUsersPermissionsUser.data?.attributes?.activeProject
          ?.data?.attributes?.name
      })
      setPage(0)
    }
  }

  const createProject = async () => {
    // router.push('/projects')
    const { data, errors } = await apolloClient.query<QueryAllUsers>({
      query: QUERY_ALL_USERS,
      fetchPolicy: 'no-cache'
    })

    if (!errors) {
      const propsModalProjectNew = modalProjectPropsDefault
      propsModalProjectNew.usersOptions = usersToSelectMapper(
        data.usersPermissionsUsers?.data
      )

      setPropsModalProject(propsModalProjectNew)
      setOpenModal(true)
      setPage(0)
    }
  }

  const tableData = projectsToTableMapper(
    projects,
    editProject,
    removeProject,
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
      {/* <Modal
        isOpen={openModal}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FormProject />
      </Modal> */}
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
