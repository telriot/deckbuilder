import React, { useEffect, useContext } from "react"
import { SearchContext } from "../contexts/SearchContext"
import { DebounceInput } from "react-debounce-input"
import { InputGroup } from "react-bootstrap"

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
    cardSearch(searchString)
    return
  }, [userInput, rarity, type, cmc])

  return (
    <div>
      <InputGroup>
        <DebounceInput
          debounceTimeout={200}
          placeholder="Type to search..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <select value={rarity} onChange={e => setRarity(e.target.value)}>
          <option value="">Rarity</option>
          <option value="mythic">Mythic</option>
          <option value="rare">Rare</option>
          <option value="uncommon">Uncommon</option>
          <option value="common">Common</option>
        </select>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">Type</option>
          <option value="land">Land</option>
          <option value="creature">Creature</option>
          <option value="artifact">Artifact</option>
          <option value="enchantment">Enchantment</option>
          <option value="planeswalker">Planeswalker</option>
          <option value="instant">Instant</option>
          <option value="sorcery">Sorcery</option>
        </select>
        <label htmlFor="cmc">
          CMC
          <DebounceInput
            name="cmc"
            debounceTimeout={200}
            type="number"
            min="0"
            value={cmc}
            onChange={e => setCmc(e.target.value)}
          ></DebounceInput>
        </label>
      </InputGroup>
    </div>
  )
}

export default SearchForm
