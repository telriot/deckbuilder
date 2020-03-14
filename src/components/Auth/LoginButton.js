import React, { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Button } from "react-bootstrap"
import { useHistory, Link } from "react-router-dom"

import axios from "axios"

const LoginButton = () => {
  const {
    setAuth,
    loginData,
    setLoginData,
    setLoginModalShow,
    setValidation,
    setSignupSuccess,
    isLoading,
    setIsLoading
  } = useContext(AuthContext)
  let history = useHistory()

  const handleForgottenPasswordClick = () => {
    setSignupSuccess(false)
    setLoginData({ username: "", password: "" })
    setValidation(prevState => {
      return {
        ...prevState,
        login: { error: "" }
      }
    })
    setLoginModalShow(false)
    history.push("/reset/credentials")
  }
  const handleSubmit = async () => {
    setIsLoading(true)
    setSignupSuccess(false)
    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          username: loginData.username,
          password: loginData.password
        },
        {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      )
      setAuth({
        isAuthenticated: true,
        authUser: response.data.username,
        authUserId: response.data.id
      })
      setIsLoading(false)
      setLoginModalShow(false)
      setValidation(prevState => {
        return {
          ...prevState,
          login: { error: "" }
        }
      })
    } catch (error) {
      setIsLoading(false)
      setValidation(prevState => {
        return {
          ...prevState,
          login: { error: "Credentials not valid, please try again" }
        }
      })
      console.log("login error", error)
    }
    setIsLoading(false)

    setLoginData({ username: "", password: "" })
  }

  return (
    <div className="d-flex justify-content-between">
      <Button
        disabled={!loginData.username || !loginData.password || isLoading}
        variant="primary"
        type="submit"
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
      <Link
        to="#"
        onClick={() => {
          handleForgottenPasswordClick()
        }}
      >
        <small>Forgot your password?</small>
      </Link>
    </div>
  )
}

export default LoginButton
