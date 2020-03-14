import React, { Fragment, useContext } from "react"
import { Row, Form } from "react-bootstrap"
import BasicPagination from "../BasicPagination"
import SelectDropdown from "../Index/SelectDropdown"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"

const UserDeckDisplay = props => {
  const {
    page,
    setPage,
    pages,
    deckSearchParams,
    setDeckSearchParams,
    decksDisplay
  } = props
  const { isXS } = useContext(WindowSizeContext)

  const paginationAndFilter = (
    <div className="d-flex justify-content-between">
      <BasicPagination pages={pages} page={page} setPage={setPage} />

      <Form className="d-flex">
        <Form.Label className="text-nowrap my-1 mr-2">Sort by </Form.Label>
        <SelectDropdown
          label="sortOrder"
          data={deckSearchParams}
          setData={setDeckSearchParams}
          arr={[
            ["updated_at", "Last active"],
            ["comments", "Comments"],
            ["matchups", "Matchups"],
            ["sideGuides", "Guides"]
          ]}
          placeholder={["date", "Created"]}
        />
      </Form>
    </div>
  )

  return (
    <Fragment>
      {paginationAndFilter}

      <Row>{decksDisplay} </Row>
      {isXS && paginationAndFilter}
    </Fragment>
  )
}

export default UserDeckDisplay
