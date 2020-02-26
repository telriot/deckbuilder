import React, { useContext } from "react"
import { Pagination } from "react-bootstrap"
import { CommentContext } from "../../../contexts/CommentContext"

const CommentPagination = () => {
  const { page, setPage, pages } = useContext(CommentContext)

  let active = page
  let items = []
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        data-number={number}
        active={number === active}
        onClick={e => {
          e.persist()
          setPage(parseInt(e.target.dataset.number))
        }}
      >
        {number}
      </Pagination.Item>
    )
  }

  return (
    <div>
      {pages > 1 && (
        <Pagination>
          {pages > 5 && (
            <Pagination.First
              disabled={page === 1 && true}
              onClick={() => setPage(1)}
            />
          )}
          <Pagination.Prev
            disabled={page === 1 && true}
            onClick={() => setPage(prevState => prevState - 1)}
          />
          {items}
          <Pagination.Next
            disabled={page === pages && true}
            onClick={() => setPage(prevState => prevState + 1)}
          />
          {pages > 5 && (
            <Pagination.Last
              disabled={page === pages && true}
              onClick={() => setPage(pages)}
            />
          )}
        </Pagination>
      )}
    </div>
  )
}

export default CommentPagination
