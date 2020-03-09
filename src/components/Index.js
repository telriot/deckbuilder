import React, { useEffect, useContext, useState, Fragment } from "react"
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap"
import axios from "axios"
import ColorCheckbox from "./Index/ColorCheckbox"
import { DecklistContext } from "../contexts/DecklistContext"
import DeckCard from "./DeckCard"
import { capitalize, palette } from "../helpers"
import AndOrCheckBox from "./Index/AndOrCheckBox"
import DecksSelect from "./Index/DecksSelect"
import TextSearchForm from "./Index/TextSearchForm"
import { WindowSizeContext } from "../contexts/WindowSizeContext"
import SubmitButton from "./Index/SubmitButton"

const Index = () => {
  const [indexList, setIndexList] = useState([])
  const { isLG, isExactlyMD, isMD, isSM, isXS } = useContext(WindowSizeContext)
  const { isLoading, setIsLoading } = useContext(DecklistContext)
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
    activity: ""
  })
  const { borderGray } = palette

  useEffect(() => {
    deckSearch()
  }, [])
  const deckSearch = async () => {
    const { name, author, format, colors } = deckSearchParams
    const { W, U, B, R, G, C, and } = colors

    try {
      setIsLoading(true)
      const response = await axios.get("/api/", {
        params: {
          name,
          author,
          format,
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
      for (let deck of response.data) {
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
      setIndexList(list)
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error(error.response)
      }
    }
    setIsLoading(false)
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
    <Form.Group>
      <Form.Label>Format</Form.Label>
      <DecksSelect
        label="format"
        data={deckSearchParams}
        setData={setDeckSearchParams}
        arr={[
          "standard",
          "pioneer",
          "modern",
          "legacy",
          "vintage",
          "pauper",
          "edh",
          "brawl",
          "arena"
        ]}
      />
    </Form.Group>
  )
  const colorForm = (
    <Form.Group>
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
    <Form.Group>
      <Form.Label>Last activity</Form.Label>
      <DecksSelect
        label="activity"
        data={deckSearchParams}
        setData={setDeckSearchParams}
        arr={["24 hours ago", "A week ago", "One month ago", "A year ago"]}
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
      <Form>
        <Row>
          <Col lg={4} xl={3}>
            <Card className="mb-3 border-0 bg-light">
              <Card.Header className="border-0" as="h6">
                Deck Finder
              </Card.Header>

              <Card.Body>
                {isLG && lgCardBody}
                {isExactlyMD && mdCardBody}
                {isSM && !isMD && smCardBody}
                {isXS && xsCardBody}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8} xl={9}>
            <Row>{indexList}</Row>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default Index
