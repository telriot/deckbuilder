import React, { Fragment } from "react"
import Maindeck from "./Decklist/Maindeck"
import Sideboard from "./Decklist/Sideboard"

const Decklist = () => {
  return (
    <Fragment>
      <Maindeck />
      <Sideboard />
    </Fragment>
  )
}

export default Decklist
