import React, { useState, useContext } from "react"
import { Modal, Button, Form, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { DecklistContext } from "../../../../contexts/DecklistContext"
import { MatchupContext } from "../../../../contexts/MatchupContext"
import axios from "axios"

const MatchupModal = props => {
  const { setDeckInfo } = useContext(DecklistContext)
  const { createTableBody } = useContext(MatchupContext)
  const [archetype, setArchetype] = useState("")
  const [result, setResult] = useState({
    g1: undefined,
    g2: undefined,
    g3: undefined
  })
  const [matchupDeck, setMatchupDeck] = useState("")
  const [comment, setComment] = useState("")
  const params = useParams()

  const handleClick = e => {
    e.persist()
    const { name, value } = e.target

    if (
      (name === "g1" && value === "W" && result.g2 === "L") ||
      (name === "g1" && !value && result.g2 === "W") ||
      (name === "g2" && value === "W" && result.g1 === "L") ||
      (name === "g2" && !value && result.g1 === "W")
    ) {
      setResult(prevState => {
        return { ...prevState, g3: undefined }
      })
    }

    if (!value) {
      setResult(prevState => {
        return { ...prevState, [name]: "W" }
      })
    } else if (value === "W") {
      setResult(prevState => {
        return { ...prevState, [name]: "L" }
      })
    } else if (value === "L") {
      setResult(prevState => {
        return { ...prevState, [name]: "D" }
      })
    } else if (value === "D") {
      setResult(prevState => {
        return { ...prevState, [name]: undefined }
      })
    }
  }

  const resultStyling = result => {
    switch (result) {
      case undefined:
        return { backgroundColor: "gray" }
      case "W":
        return { backgroundColor: "green" }
      case "L":
        return { backgroundColor: "red" }
      case "D":
        return { backgroundColor: "yellow" }
      default:
        return { backgroundColor: "gray" }
    }
  }

  let resultsObj = () => {
    const { g1, g2, g3 } = result
    return {
      matchup: {
        archetype: archetype,
        preboard: {
          w: g1 === "W" ? 1 : 0,
          l: g1 === "L" ? 1 : 0,
          u: g1 === "D" ? 1 : 0
        },
        postboard: {
          w: (g2 === "W" ? 1 : 0) + (g3 === "W" ? 1 : 0),
          l: (g2 === "L" ? 1 : 0) + (g3 === "L" ? 1 : 0),
          u: (g2 === "D" ? 1 : 0) + (g3 === "D" ? 1 : 0)
        },

        total: {
          w:
            (g1 === "W" && g2 === "W") ||
            g3 === "W" ||
            (g1 === "W" && g2 === "D") ||
            (g1 === "D" && g2 === "W")
              ? 1
              : 0,
          l:
            (g1 === "L" && g2 === "L") ||
            g3 === "L" ||
            (g1 === "L" && g2 === "D") ||
            (g1 === "D" && g2 === "L")
              ? 1
              : 0,
          u: g3 === "D" ? 1 : 0
        }
      },
      deckId: params.id
    }
  }

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/decks/${params.id}/matchups`, resultsObj(), {
        "Content-Type": "raw"
      })
    } catch (error) {
      console.error(error.response)
    }
    setResult({ g1: undefined, g2: undefined, g3: undefined })
    setArchetype("")
    setMatchupDeck("")
    setComment("")
    try {
      await axios.post(
        `/api/decks/${params.id}/matchups`,
        { archetype, matchupDeck, comment, result, deckId: params.id },
        {
          "Content-Type": "raw"
        }
      )
    } catch (error) {
      console.error(error.response)
    }

    try {
      const response = await axios.get(`/api/decks/${params.id}`)
      setDeckInfo(response.data)
      createTableBody(params)
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error(error.response)
      }
    }
    props.onHide()
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Matchup details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                as="select"
                value={archetype}
                onChange={e => setArchetype(e.target.value)}
              >
                <option value="">Archetype</option>
                <option value="aggro">Aggro</option>
                <option value="disruptive">Disruptive</option>
                <option value="midrange">Midrange</option>
                <option value="combo">Combo</option>
                <option value="combocontrol">Combo-control</option>
                <option value="control">Control</option>
                <option value="ramp">Ramp</option>
                <option value="others">Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Control
                style={resultStyling(result.g1)}
                as={Button}
                name="g1"
                onClick={e => handleClick(e)}
                value={result.g1}
              >
                G1
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Control
                style={resultStyling(result.g2)}
                as={Button}
                name="g2"
                onClick={e => handleClick(e)}
                value={result.g2}
              >
                G2
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs={2}>
              <Form.Control
                disabled={result.g1 === result.g2}
                style={resultStyling(result.g3)}
                as={Button}
                name="g3"
                onClick={e => handleClick(e)}
                value={result.g3}
              >
                G3
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={3}>
              {" "}
              <Form.Control
                type="text"
                name="matchupDeck"
                value={matchupDeck}
                onChange={e => setMatchupDeck(e.target.value)}
                placeholder="Deck type"
              />
            </Form.Group>
            <Form.Group as={Col} sm={9}>
              <Form.Control
                type="text"
                name="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Comments..."
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button
          disabled={
            !archetype || !result.g2 || (result.g1 !== result.g2 && !result.g3)
          }
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MatchupModal
