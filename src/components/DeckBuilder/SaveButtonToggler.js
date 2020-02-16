import React, { Fragment, useContext } from "react"
import { useParams } from "react-router-dom"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import SaveButton from "./SaveButtonToggler/SaveButton"
import SaveEditButtonGroup from "./SaveButtonToggler/SaveEditButtonGroup"

const SaveButtonToggler = () => {
  const params = useParams()
  const { isXS } = useContext(WindowSizeContext)

  const divResponsive = () => {
    if (isXS) {
      return ""
    }
    return "d-flex float-right"
  }

  return (
    <Fragment>
      <div className={divResponsive()}>
        {params.id === undefined ? <SaveButton /> : <SaveEditButtonGroup />}
      </div>
    </Fragment>
  )
}

export default SaveButtonToggler
