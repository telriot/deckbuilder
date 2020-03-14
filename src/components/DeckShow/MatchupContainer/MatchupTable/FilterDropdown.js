import React from "react"
import { Dropdown } from "react-bootstrap"

const FilterDropdown = props => {
  const { toggle, html, menu } = props
  return (
    <Dropdown>
      <Dropdown.Toggle as={toggle} id="dropdown-custom-components">
        {html}
      </Dropdown.Toggle>

      <Dropdown.Menu as={menu} />
    </Dropdown>
  )
}

export default FilterDropdown
