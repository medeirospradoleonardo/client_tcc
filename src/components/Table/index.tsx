import * as React from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { StyledTableCell, StyledTableRow } from './styles'
import { Icon, TableFooter, TablePagination } from '@mui/material'
import TablePaginationActions from './TablePagination'

import { AiFillEdit, AiTwotoneDelete, AiOutlineCheck } from 'react-icons/ai'

function createData(name: string, role: string, icons: React.ReactNode[]) {
  return { name, role, icons }
}

const rows = [
  createData('Vale ouro', 'Lider', [
    <AiFillEdit size={20} key="d" />,
    <AiTwotoneDelete size={20} key="a" />,
    <AiOutlineCheck size={20} key="b" />
  ])
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
  // createData('Gingdadaerbread', 356, 16.0, 49, 3.9)
]

export default function CustomizedTables() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right">Papel</StyledTableCell>
            <StyledTableCell align="right">Opcoes</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="right">
                {row.role}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="right">
                {row.icons}
              </StyledTableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
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
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
