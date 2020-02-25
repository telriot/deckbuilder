import React, { Fragment, useContext } from "react"
import { WindowSizeContext } from "../contexts/WindowSizeContext"
import { Container } from "react-bootstrap"
import SaveButtonToggler from "./DeckBuilder/SaveButtonToggler"
import DeckDataForm from "./DeckBuilder/DeckDataForm"
import Decklist from "./DeckBuilder/Decklist"
import FileReaderButton from "./DeckBuilder/FileReaderButton"

const DeckForm = () => {
  const { isMD, isXS } = useContext(WindowSizeContext)

  return (
    <Fragment>
      {isMD && <DeckDataForm />}
      <Decklist />
      {((!isXS && !isMD) || isXS) && <DeckDataForm />}
      <FileReaderButton />
      <Container fluid className="px-0 my-2 justify-content-right">
        <SaveButtonToggler />
      </Container>
    </Fragment>
  )
}

export default DeckForm
