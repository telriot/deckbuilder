import React, { useContext } from "react"
import { DecklistContext } from "../../contexts/DecklistContext"
import { dataSrc } from "../../helpers/"
import { Button } from "react-bootstrap"

const DeckHeader = props => {
  const { deckObj, sideObj } = useContext(DecklistContext)

  const classNameDisplay = () => {
    if (props.display && props.display === "block") {
      return "btn-sm btn-primary btn-block"
    } else {
      return "btn-sm btn-primary"
    }
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a")
    const file = new Blob(dataSrc(deckObj, sideObj), { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "myFile.txt"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }
  return (
    <Button
      size="sm"
      className={classNameDisplay()}
      onClick={() => downloadTxtFile()}
    >
      Download
    </Button>
  )
}

export default DeckHeader
