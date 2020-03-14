import React from "react"
import { FormCheck } from "react-bootstrap"

const PasswordCheckbox = props => {
  const { isVisible, setIsVisible } = props

  function handleCheck() {
    setIsVisible(prevState => !prevState)
  }

  return (
    <FormCheck className="d-flex">
      <FormCheck.Label style={{ fontSize: "0.8rem", paddingTop: "0.1rem" }}>
        Show Password
      </FormCheck.Label>
      <FormCheck.Input
        type="checkbox"
        onChange={() => handleCheck()}
        checked={isVisible}
      />
    </FormCheck>
  )
}

export default PasswordCheckbox
