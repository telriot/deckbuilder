import React, { useContext, useEffect } from "react"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import { DecklistContext } from "../../contexts/DecklistContext"
import { Form } from "react-bootstrap"
import SearchBar from "./CardSearchForm/SearchBar"
import TableColumnsPopover from "../DeckBuilder/CardSearchForm/TableColumnsPopover"
import SearchFiltersPopover from "../DeckBuilder/CardSearchForm/SearchFiltersPopover"
import SearchFilters from "./CardSearchForm/SearchFilters"

const CardSearchForm = () => {
  const { isSM, isExactlyMD, isXS } = useContext(WindowSizeContext)
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
      !isExactlyMD &&
      setVisibleColumns({
        cost: true,
        type: true,
        cmc: false,
        rarity: false
      })
    setSearchFilters({
      color: true,
      type: true,
      cmc: true,
      rarity: true
    })
    isExactlyMD &&
      setVisibleColumns({
        cost: true,
        type: false,
        cmc: false,
        rarity: false
      })
  }, [isSM, isXS, isExactlyMD])

  return (
    <Form>
      <div className="d-flex">
        <SearchBar />

        {isSM && <TableColumnsPopover />}
        <SearchFiltersPopover />
      </div>

      <Form.Row className="mb-2">
        <SearchFilters />
      </Form.Row>
    </Form>
  )
}

export default CardSearchForm
