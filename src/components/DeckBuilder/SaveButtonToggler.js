import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import SaveButton from "./SaveButtonToggler/SaveButton"
import SaveEditButtonGroup from "./SaveButtonToggler/SaveEditButtonGroup"

const SaveButtonToggler = () => {
  const params = useParams()

  return (
    <Fragment>
      {params.id === undefined ? (
        <div className="float-right">
          <SaveButton />
        </div>
      ) : (
        <div className="d-flex float-right">
          <SaveEditButtonGroup />
        </div>
      )}
    </Fragment>
  )
}

export default SaveButtonToggler
