import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Button } from "react-bootstrap"

const EditSubmitButton = () => {
  const { isLoading } = useContext(UserContext)
  return (
    <div>
      <Button disabled={isLoading} variant="primary" type="submit">
        Save changes
      </Button>
    </div>
  )
}

export default EditSubmitButton
