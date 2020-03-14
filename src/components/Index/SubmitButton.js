import React from "react"
import { Button } from "react-bootstrap"
const SubmitButton = props => {
  const { func, loading } = props

  return (
    <Button
      disabled={loading}
      block
      className="mb-1"
      size="sm"
      variant="primary"
      onClick={() => func()}
    >
      Submit
    </Button>
  )
}

export default SubmitButton
