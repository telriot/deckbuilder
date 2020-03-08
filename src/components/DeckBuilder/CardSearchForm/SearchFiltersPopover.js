import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Popover, OverlayTrigger, Button, Form } from "react-bootstrap"

const SearchFiltersPopover = () => {
  const { searchFilters, setSearchFilters } = useContext(DecklistContext)

  const onCheckboxChange = e => {
    e.persist()
    console.log("change")
    setSearchFilters(prevState => {
      return {
        ...prevState,
        [e.target.name]: prevState[e.target.name] ? false : true
      }
    })
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <Form>
          <Form.Check
            label="Rarity"
            name="rarity"
            checked={searchFilters.rarity}
            onChange={e => onCheckboxChange(e)}
          />
          <Form.Check
            label="Type"
            name="type"
            checked={searchFilters.type}
            onChange={e => onCheckboxChange(e)}
          />
          <Form.Check
            label="Color"
            name="color"
            checked={searchFilters.color}
            onChange={e => onCheckboxChange(e)}
          />
          <Form.Check
            label="CMC"
            name="cmc"
            checked={searchFilters.cmc}
            onChange={e => onCheckboxChange(e)}
          />
        </Form>
      </Popover.Content>
    </Popover>
  )

  const SearchFiltersOverlay = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button className="btn-sm float-right ml-2 mb-2">Filters</Button>
    </OverlayTrigger>
  )
  return <SearchFiltersOverlay />
}

export default SearchFiltersPopover
