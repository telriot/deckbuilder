import React, { useEffect, useContext } from "react"
import { SearchContext } from "../contexts/SearchContext"
import { DebounceInput } from "react-debounce-input"
import { Form, Col, Row } from "react-bootstrap"

const SearchForm = () => {
  const {
    userInput,
    setUserInput,
    cardSearch,
    rarity,
    setRarity,
    cmc,
    setCmc,
    type,
    setType
  } = useContext(SearchContext)

  const searchString = `${userInput}${rarity ? "+r%3A" : ""}${rarity}${
    type ? "+t%3A" : ""
  }${type}${cmc ? "+cmc%3A" : ""}${cmc}`

  useEffect(() => {
    searchString && cardSearch(searchString)
    return
  }, [userInput, rarity, type, cmc])

  return (
    <Form>
      <Form.Row>
        <Col>
          <Form.Control
            as={DebounceInput}
            size="sm"
            className="mx-1"
            type="text"
            debounceTimeout={400}
            placeholder="Type to search..."
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4}>
          <Form.Control
            size="sm"
            className="m-1"
            as="select"
            value={rarity}
            onChange={e => setRarity(e.target.value)}
          >
            <option value="">Rarity</option>
            <option value="mythic">Mythic</option>
            <option value="rare">Rare</option>
            <option value="uncommon">Uncommon</option>
            <option value="common">Common</option>
          </Form.Control>
        </Col>
        <Col sm={4}>
          <Form.Control
            size="sm"
            className="m-1"
            as="select"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="">Type</option>
            <option value="land">Land</option>
            <option value="creature">Creature</option>
            <option value="artifact">Artifact</option>
            <option value="enchantment">Enchantment</option>
            <option value="planeswalker">Planeswalker</option>
            <option value="instant">Instant</option>
            <option value="sorcery">Sorcery</option>
          </Form.Control>
        </Col>
        <Col sm={4} className="form-inline">
          <Form.Group>
            <Form.Label>CMC</Form.Label>
            <Form.Control
              size="sm"
              as={DebounceInput}
              className="form-control mx-1"
              style={{ width: "50px" }}
              name="cmc"
              debounceTimeout={200}
              type="number"
              min="0"
              value={cmc}
              onChange={e => setCmc(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  )
}

export default SearchForm
