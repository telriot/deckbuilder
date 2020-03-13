import React, { useContext, Fragment } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Card, Spinner } from "react-bootstrap"

const DeckTab = props => {
  const { createList, onDragOver, onDrop, fileReaderIsLoading } = useContext(
    DecklistContext
  )
  const { origin, deck, setDeck, obj } = props

  return (
    <Fragment>
      {fileReaderIsLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner
            className="my-3"
            style={{ height: "7rem", width: "7rem" }}
            animation="grow"
            variant="primary"
          />
        </div>
      ) : (
        <Card.Body
          style={{ fontSize: "0.85rem" }}
          className="p-2"
          data-origin={origin}
          onDragOver={e => onDragOver(e)}
          onDrop={e => onDrop(e)}
          key={`${deck}tab`}
        >
          {deck.length ? createList(deck, setDeck, obj) : ""}
        </Card.Body>
      )}
    </Fragment>
  )
}

export default DeckTab
