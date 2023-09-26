import * as React from 'react'
import ReactPaginate from 'react-paginate'

import './styles.ts'

export type PaginateProps = {
  children?: React.ReactNode
  itemsPerPage: number
  itemsLength: number
}

export default function PaginateComponent({ itemsPerPage }: PaginateProps) {
  const [itemOffset, setItemOffset] = React.useState(0)

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % itemsLength

    setItemOffset(newOffset)
  }
  return (
    <>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        breakLabel="dadsad"
        previousLabel="<<"
        nextLabel=">>"
        breakClassName="break-me"
        renderOnZeroPageCount={null}
        breakLinkClassName="page-link"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
    </>
  )
}
