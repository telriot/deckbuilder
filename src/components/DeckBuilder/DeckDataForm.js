import React from "react"
import DeckNameBar from "./DeckDataForm/DeckNameBar"
import FormatSelector from "./DeckDataForm/FormatSelector"
import DeckSortingSelector from "./DeckDataForm/DeckSortingSelector"
import { Form, Col } from "react-bootstrap"

const DeckDataForm = () => {
  return (
    <Form>
      <DeckNameBar />
      <Form.Row>
        <Col>
          <FormatSelector />
        </Col>
        <Col>
          <DeckSortingSelector />
        </Col>
      </Form.Row>
    </Form>
  )
}

export default DeckDataForm
