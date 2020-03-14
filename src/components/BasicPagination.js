import React from "react"
import { Pagination } from "react-bootstrap"

const BasicPagination = props => {
  const { page, setPage, pages } = props

  let active = page
  let items = []
  if (pages > 1 && pages <= 5 && page < 4) {
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
  } else if (pages > 1 && page < 4) {
    for (let number = 1; number <= 5; number++) {
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
  } else if (pages > 1 && page >= 4) {
    for (let number = page - 2; number <= page + 2; number++) {
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
  }

  return (
    <div>
      {pages > 1 && (
        <Pagination size="sm">
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

export default BasicPagination
