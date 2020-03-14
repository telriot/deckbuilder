import React, { Fragment } from "react"
import { Button, Spinner } from "react-bootstrap"
import axios from "axios"

const PasswordResetPageButton = props => {
  const {
    isSending,
    setIsSending,
    setUpdated,
    setErrors,
    dataInitialState,
    errors,
    formData
  } = props

  const handleSubmit = async () => {
    setIsSending(true)
    setUpdated(false)

    try {
      const response = await axios.put("/api/auth/updatePasswordViaEmail", {
        username: formData.username,
        password: formData.password
      })
      console.log(response.data)
      if (response.data.message === "password updated") {
        setIsSending(false)
        setUpdated(true)
        setErrors(dataInitialState)
      }
    } catch (error) {
      console.log(error)
      setIsSending(false)
      setUpdated(false)
      setErrors({
        server: "Network error. Please send a new reset request."
      })
    }
  }

  return (
    <Button
      disabled={
        !formData.password ||
        !formData.passwordConfirmation ||
        errors.password ||
        errors.passwordConfirmation ||
        isSending
      }
      onClick={() => handleSubmit()}
    >
      {isSending ? (
        <Fragment>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Sending request...
        </Fragment>
      ) : (
        <Fragment>Reset Password</Fragment>
      )}
    </Button>
  )
}

export default PasswordResetPageButton
