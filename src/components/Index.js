import React, { useEffect, useContext, useState, Fragment } from "react"
import { Container, Card, Row, Col, Form } from "react-bootstrap"
import { WindowSizeContext } from "../contexts/WindowSizeContext"
import ColorCheckbox from "./Index/ColorCheckbox"
import AndOrCheckBox from "./Index/AndOrCheckBox"
import SelectDropdown from "./Index/SelectDropdown"
import TextSearchForm from "./Index/TextSearchForm"
import SubmitButton from "./Index/SubmitButton"
import DeckDisplay from "./User/DeckDisplay"
import DeckCard from "./DeckCard"
import axios from "axios"
import { palette } from "../helpers"

const Index = () => {
  const [indexList, setIndexList] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const { isLG, isExactlyMD, isMD, isSM, isXS } = useContext(WindowSizeContext)
  const [deckSearchParams, setDeckSearchParams] = useState({
    name: "",
    author: "",
    format: "",
    colors: {
      W: false,
      U: false,
      B: false,
      R: false,
      G: false,
      C: false,
      and: true
    },
    activity: "",
    sortOrder: "date"
  })
  const { borderGray } = palette

  useEffect(() => {
    deckSearch()
  }, [page, deckSearchParams.sortOrder])

  const deckSearch = async () => {
    const {
      name,
      author,
      format,
      colors,
      activity,
      sortOrder
    } = deckSearchParams
    const { W, U, B, R, G, C, and } = colors
    try {
      const response = await axios.get("/api/", {
        params: {
          name,
          author,
          format,
          activity,
          page,
          sortOrder,
          w: W ? "w" : "none",
          u: U ? "u" : "none",
          b: B ? "b" : "none",
          r: R ? "r" : "none",
          g: G ? "g" : "none",
          c: C ? "c" : "none",
          and: and ? "and" : "or"
        }
      })
      let list = []
      for (let deck of response.data.docs) {
        const {
          _id,
          name,
          format,
          matches,
          comments,
          colors,
          matchups,
          author,
          authorUsername,
          sideGuides
        } = deck
        list.push(
          <DeckCard
            id={_id}
            name={name}
            format={format}
            key={`deckCard${_id}`}
            matches={matches}
            comments={comments}
            colors={colors}
            matchups={matchups}
            author={author}
            authorUsername={authorUsername}
            sideGuides={sideGuides}
          />
        )
      }
      setPages(response.data.totalPages)
      setIndexList(list)
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error(error.response)
      }
    }
  }

  const deckNameForm = (
    <TextSearchForm
      text="Deck Name"
      name="name"
      placeholder="Manaless Dredge..."
      data={deckSearchParams}
      setData={setDeckSearchParams}
    />
  )
  const authorForm = (
    <TextSearchForm
      text="Author"
      name="author"
      placeholder="matsugan"
      data={deckSearchParams}
      setData={setDeckSearchParams}
    />
  )
  const formatForm = (
    <Form.Group className={isXS ? "mb-2" : ""}>
      <Form.Label>Format</Form.Label>
      <SelectDropdown
        label="format"
        data={deckSearchParams}
        setData={setDeckSearchParams}
        arr={[
          ["standard", "Standard"],
          ["pioneer", "Pioneer"],
          ["modern", "Modern"],
          ["legacy", "Legacy"],
          ["vintage", "Vintage"],
          ["pauper", "Pauper"],
          ["edh", "EDH"],
          ["brawl", "Brawl"],
          ["arena", "Arena"]
        ]}
      />
    </Form.Group>
  )

  const colorForm = (
    <Form.Group className={isXS ? "mb-2" : ""}>
      <Form.Label className="d-flex justify-content-between">
        Colors
        <div className="d-flex ">
          {["and", "or"].map(value => {
            return (
              <AndOrCheckBox
                label={value}
                data={deckSearchParams}
                setData={setDeckSearchParams}
                key={value}
              />
            )
          })}
        </div>
      </Form.Label>
      <div
        style={{
          backgroundColor: "white",
          border: `1px ${borderGray} solid`,
          textAlign: "center",
          borderRadius: ".2rem",
          padding: "0.75rem 0.5rem"
        }}
      >
        {["W", "U", "B", "R", "G", "C"].map(value => {
          return (
            <Fragment key={`checkbox${value}`}>
              {" "}
              <ColorCheckbox
                color={value}
                state={deckSearchParams}
                setState={setDeckSearchParams}
              />{" "}
            </Fragment>
          )
        })}
      </div>
    </Form.Group>
  )

  const activityForm = (
    <Form.Group className={isXS ? "mb-2" : ""}>
      <Form.Label>Last active</Form.Label>
      <SelectDropdown
        label="activity"
        data={deckSearchParams}
        setData={setDeckSearchParams}
        arr={[
          [1, "24 hours ago"],
          [7, "A week ago"],
          [30, "One month ago"],
          [365, "A year ago"]
        ]}
      />
    </Form.Group>
  )

  const lgCardBody = (
    <Fragment>
      {deckNameForm}
      {authorForm}
      {formatForm}
      {colorForm}
      {activityForm}
      <SubmitButton func={deckSearch} />
    </Fragment>
  )

  const mdCardBody = (
    <Fragment>
      <Row>
        <Col md={5}>{deckNameForm}</Col>
        <Col md={4}>{authorForm}</Col>
        <Col md={3}>{formatForm}</Col>
      </Row>

      <Row>
        <Col md={5}>{colorForm}</Col>
        <Col md={4}> {activityForm}</Col>

        <Col md={3} className="d-flex align-items-center">
          <SubmitButton className="py-1" func={deckSearch} />
        </Col>
      </Row>
    </Fragment>
  )
  const smCardBody = (
    <Fragment>
      <Row>
        <Col sm={5}>{deckNameForm}</Col>
        <Col sm={4}>{authorForm}</Col>
        <Col sm={3}>{formatForm}</Col>
      </Row>
      <Row>
        <Col sm={6}> {colorForm}</Col>
        <Col sm={3}> {activityForm}</Col>

        <Col sm={3} className="d-flex align-items-center">
          <SubmitButton className="py-1" func={deckSearch} />
        </Col>
      </Row>
    </Fragment>
  )

  const xsCardBody = (
    <Fragment>
      {deckNameForm}
      {authorForm}
      <Row>
        <Col xs={6}> {formatForm} </Col>
        <Col xs={6}> {activityForm}</Col>
      </Row>

      {colorForm}

      <SubmitButton className="py-1" func={deckSearch} />
    </Fragment>
  )

  return (
    <Container>
      <Row>
        <Col lg={4} xl={3}>
          <Form>
            <Card className="mb-3 border-0 bg-light">
              <Card.Header className="border-0" as="h6">
                Deck Finder
              </Card.Header>

              <Card.Body
                style={isMD ? { fontSize: "1rem" } : { fontSize: "0.9rem" }}
                className={isMD ? "" : "py-2"}
              >
                {isLG && lgCardBody}
                {isExactlyMD && mdCardBody}
                {isSM && !isMD && smCardBody}
                {isXS && xsCardBody}
              </Card.Body>
            </Card>
          </Form>
        </Col>
        <Col lg={8} xl={9}>
          <DeckDisplay
            page={page}
            setPage={setPage}
            pages={pages}
            deckSearchParams={deckSearchParams}
            setDeckSearchParams={setDeckSearchParams}
            decksDisplay={indexList}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Index
