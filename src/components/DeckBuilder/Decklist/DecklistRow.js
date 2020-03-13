import React, { useContext, useState } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Row, Col } from "react-bootstrap"
import CardDataSpan from "../DeckDataForm/CardDataSpan"
import CardCopiesController from "../DeckDataForm/CardCopiesController"
import ControllerButton from "../DeckDataForm/ControllerButton"

const DecklistRow = props => {
  const { deck, setDeck, obj, i } = props
  const { mainDeck, handleDeleteButton, handleSideToMainButton } = useContext(
    DecklistContext
  )
  const [hover, setHover] = useState("")

  return (
    <Row
      className="px-2"
      data-origin={`${deck === mainDeck ? "main" : "side"}`}
      key={`row${i}${deck}`}
      onMouseEnter={() => {
        setHover(i)
      }}
      onMouseLeave={() => setHover("")}
    >
      <Col
        key={`col1${i}${deck}`}
        className="pl-2"
        xs={8}
        data-origin={`${deck === mainDeck ? "main" : "side"}`}
        style={{ backgroundColor: hover === i ? "#F8F9FA" : "white" }}
      >
        {/* n. of copies controller */}
        <CardCopiesController i={i} obj={obj} deck={deck} setDeck={setDeck} />
        {/* card data */}
        <CardDataSpan
          i={i}
          obj={obj}
          deck={deck}
          setDeck={setDeck}
          setHover={setHover}
        />
      </Col>
      <Col
        key={`col2${i}${deck}`}
        xs={4}
        className="m-0 pl-0 pr-2"
        data-origin={`${deck === mainDeck ? "main" : "side"}`}
        style={{ backgroundColor: hover === i ? "#F8F9FA" : "white" }}
      >
        {/* delete button */}
        <ControllerButton
          i={i}
          obj={obj}
          deck={deck}
          setDeck={setDeck}
          handleFunction={handleDeleteButton}
          type="deleteCard"
          hover={hover}
        />
        {/* main<>side button */}
        <ControllerButton
          i={i}
          obj={obj}
          deck={deck}
          setDeck={setDeck}
          handleFunction={handleSideToMainButton}
          type="mainSideController"
          hover={hover}
        />
      </Col>
    </Row>
  )
}

export default DecklistRow
