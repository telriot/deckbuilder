import React, { useContext, Fragment } from "react"
import { Link } from "react-router-dom"
import { DecklistContext } from "../../contexts/DecklistContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"

const DeckHeader = () => {
  const { deckInfo } = useContext(DecklistContext)
  const { isMD } = useContext(WindowSizeContext)

  return (
    <Fragment>
      {isMD ? (
        <h3 className="m-0">
          {deckInfo.name} -{" "}
          <small className="text-muted">
            by{" "}
            <Link to={`/users/${deckInfo.author}`}>
              {deckInfo.authorUsername}
            </Link>
          </small>
        </h3>
      ) : (
        <h5 className="m-0">
          {deckInfo.name}
          <p style={{ fontSize: "0.8rem" }} className="m-0 text-muted">
            by{" "}
            <Link to={`/users/${deckInfo.author}`}>
              {deckInfo.authorUsername}
            </Link>
          </p>
        </h5>
      )}
    </Fragment>
  )
}

export default DeckHeader
