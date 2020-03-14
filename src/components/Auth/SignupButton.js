import React, { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Button } from "react-bootstrap"
import axios from "axios"

const SignupButton = () => {
  const {
    isLoading,
    signupData,
    setSignupData,
    setSignupModalShow,
    validation,
    setValidation,
    handleValidation,
    validationInitialState,
    signupDataInitialState,
    setSignupSuccess,
    setIsLoading,
    setLoginModalShow,
    setSignupServerError
  } = useContext(AuthContext)

  const handleSubmit = async () => {
    const { password, username, passwordConfirmation, email } = signupData

    const validationResults = await handleValidation(
      username,
      password,
      password,
      email
    )
    if (validationResults) {
      setIsLoading(true)
      try {
        await axios.post(
          "/api/auth/signup",
          {
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation,
            email: email
          },
          {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        )
        console.log("successful signup")
        setIsLoading(false)
        setValidation(validationInitialState)
        setSignupModalShow(false)
        setSignupSuccess(true)
        setLoginModalShow(true)
      } catch (error) {
        setIsLoading(false)
        setValidation(validationInitialState)
        setSignupSuccess(false)
        setSignupServerError(true)
        console.log(error)
      }
    }
    setSignupData(signupDataInitialState)
  }

  return (
    <Button
      disabled={
        isLoading ||
        !signupData.password ||
        !signupData.username ||
        validation.username.error ||
        validation.password.error ||
        validation.passwordConfirmation.error ||
        validation.email.error ||
        signupData.password !== signupData.passwordConfirmation
      }
      variant="primary"
      type="submit"
      onClick={() => handleSubmit()}
    >
      Submit
    </Button>
  )
}

export default SignupButton
