import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Popover, OverlayTrigger, Button, Form } from "react-bootstrap"

const TableColumnsPopover = () => {
  const { visibleColumns, setVisibleColumns } = useContext(DecklistContext)

  const onCheckboxChange = e => {
    e.persist()
    setVisibleColumns(prevState => {
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
            label="Cost"
            name="cost"
            checked={visibleColumns.cost}
            onChange={e => onCheckboxChange(e)}
          />
          <Form.Check
            label="Type"
            name="type"
            checked={visibleColumns.type}
            onChange={e => onCheckboxChange(e)}
          />
          <Form.Check
            label="CMC"
            name="cmc"
            checked={visibleColumns.cmc}
            onChange={e => onCheckboxChange(e)}
          />
          <Form.Check
            label="Rarity"
            name="rarity"
            checked={visibleColumns.rarity}
            onChange={e => onCheckboxChange(e)}
          />
        </Form>
      </Popover.Content>
    </Popover>
  )

  const TableColumnsOverlay = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button className="btn-sm float-right ml-2 mb-2">Columns</Button>
    </OverlayTrigger>
  )
  return <TableColumnsOverlay />
}

export default TableColumnsPopover
