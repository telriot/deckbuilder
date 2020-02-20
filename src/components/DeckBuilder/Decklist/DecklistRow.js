import React, { useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Form, Col } from "react-bootstrap"
import CardDataSpan from "../DeckDataForm/CardDataSpan"
import CardCopiesController from "../DeckDataForm/CardCopiesController"
import ControllerButton from "../DeckDataForm/ControllerButton"

const DecklistRow = props => {
  const { deck, setDeck, obj, i } = props
  const { mainDeck, handleDeleteButton, handleSideToMainButton } = useContext(
    DecklistContext
  )

  return (
    <Form.Row data-origin={`${deck === mainDeck ? "main" : "side"}`} key={i}>
      <Col xs={8} data-origin={`${deck === mainDeck ? "main" : "side"}`}>
        {/* n. of copies controller */}
        <CardCopiesController i={i} obj={obj} deck={deck} setDeck={setDeck} />
        {/* card data */}
        <CardDataSpan i={i} obj={obj} deck={deck} setDeck={setDeck} />
      </Col>
      <Col
        xs={4}
        className="m-0"
        data-origin={`${deck === mainDeck ? "main" : "side"}`}
      >
        {/* delete button */}
        <ControllerButton
          i={i}
          obj={obj}
          deck={deck}
          setDeck={setDeck}
          handleFunction={handleDeleteButton}
          type="deleteCard"
        />
        {/* main<>side button */}
        <ControllerButton
          i={i}
          obj={obj}
          deck={deck}
          setDeck={setDeck}
          handleFunction={handleSideToMainButton}
          type="mainSideController"
        />
      </Col>
    </Form.Row>
  )
}

export default DecklistRow
