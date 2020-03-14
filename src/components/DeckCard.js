import React, { useContext } from "react"
import { Card, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Link } from "react-router-dom"
import { palette } from "../helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons"
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons"
import { faSwatchbook } from "@fortawesome/free-solid-svg-icons"
import { WindowSizeContext } from "../contexts/WindowSizeContext"

const DeckCard = props => {
  const {
    id,
    name,
    format,
    matches,
    comments,
    colors,
    matchups,
    author,
    authorUsername,
    sideGuides
  } = props

  const { stdBlue } = palette
  const { isLG } = useContext(WindowSizeContext)

  const commentIcon = (
    <FontAwesomeIcon style={{ color: stdBlue }} icon={faCommentAlt} />
  )
  const matchupIcon = (
    <FontAwesomeIcon style={{ color: stdBlue }} icon={faSkullCrossbones} />
  )
  const sideGuideIcon = (
    <FontAwesomeIcon style={{ color: stdBlue }} icon={faSwatchbook} />
  )

  const renderDeckColors = colors => {
    let colorArr = []
    for (let color of colors) {
      for (let [key, value] of Object.entries(color)) {
        if (value === true) {
          colorArr.push(
            <i key={`${key}${id}`} className={`ms ms-${key} ms-cost`}></i>
          )
        }
      }
    }
    return colorArr
  }

  const winLossDraw = matchups => {
    let win = 0
    let loss = 0
    let draw = 0
    for (let value of Object.values(matchups)) {
      win += value.total.w
      loss += value.total.l
      draw += value.total.u
    }
    return { W: win, L: loss, D: draw }
  }

  return (
    <Col md={4} className={!isLG ? "py-0 px-2" : "p-0"} key={`col-card${id}`}>
      <Card className="border-0 bg-light mb-3 mx-2" key={`key-card${id}`}>
        <Card.Body className="p-3">
          <Row>
            <Col xs={9}>
              <h5 className="mb-1">
                <Link to={`/decks/${id}`}>{name}</Link>{" "}
              </h5>
              {author && (
                <p className="mb-2">
                  by <Link to={`/users/${author}`}>{authorUsername}</Link>
                </p>
              )}
              <p
                style={{ fontSize: "0.8rem" }}
                className="text-capitalize mb-2"
              >
                {format}
              </p>
              <p style={{ fontSize: "0.8rem" }} className="mb-2">
                {!!colors.length && renderDeckColors(colors)}
              </p>
            </Col>
            <Col
              style={{ fontSize: "0.875rem" }}
              className="d-flex flex-column justify-content-center align-items-center px-1"
              xs={3}
            >
              <p>
                {commentIcon} {comments.length}
              </p>
              <OverlayTrigger
                placement="bottom-start"
                overlay={
                  <Tooltip
                    id="tooltip"
                    arrowProps={{ style: { visibility: "hidden" } }}
                  >
                    <strong>
                      {matchups &&
                        `${winLossDraw(matchups).W}-${
                          winLossDraw(matchups).L
                        }-${winLossDraw(matchups).D}`}
                      {matchups && ``}
                    </strong>
                  </Tooltip>
                }
              >
                <p>
                  {matchupIcon} {matches.length}
                </p>
              </OverlayTrigger>
              <p>
                {sideGuideIcon} {sideGuides && sideGuides.length}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default DeckCard
