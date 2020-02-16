import React, { useContext, useEffect } from "react"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import { DecklistContext } from "../../contexts/DecklistContext"
import { Form, Col } from "react-bootstrap"
import SearchBar from "./CardSearchForm/SearchBar"
import TableColumnsPopover from "../DeckBuilder/CardSearchForm/TableColumnsPopover"
import SearchFiltersPopover from "../DeckBuilder/CardSearchForm/SearchFiltersPopover"
import SearchFilters from "./CardSearchForm/SearchFilters"

const CardSearchForm = () => {
  const { isSM, isXS, dimensions } = useContext(WindowSizeContext)
  const { setVisibleColumns, setSearchFilters } = useContext(DecklistContext)

  useEffect(() => {
    isXS &&
      setVisibleColumns({
        cost: true,
        type: false,
        cmc: false,
        rarity: false
      })
    setSearchFilters({
      color: false,
      type: false,
      cmc: false,
      rarity: false
    })
    isSM &&
      setVisibleColumns({
        cost: true,
        type: true,
        cmc: false,
        rarity: false
      })
    isSM &&
      setSearchFilters({
        color: true,
        type: true,
        cmc: true,
        rarity: true
      })
  }, [dimensions])

  return (
    <Form>
      <Form.Row>
        <Col xl={8} lg={7} md={6} sm={8} xs={10}>
          <SearchBar />
        </Col>
        <Col xl={4} lg={5} md={6} sm={4} xs={2}>
          {isSM && <TableColumnsPopover />}
          <SearchFiltersPopover />
        </Col>
      </Form.Row>
      <Form.Row className="mb-1">
        <SearchFilters />
      </Form.Row>
    </Form>
  )
}

export default CardSearchForm
