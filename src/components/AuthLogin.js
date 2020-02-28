import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { Container, Form } from "react-bootstrap"
import { AuthContext } from "../contexts/AuthContext"
import LoginForm from "./Auth/LoginForm"

import axios from "axios"

const AuthLogin = () => {
  const { setAuth, loginData, setLoginData } = useContext(AuthContext)

  let history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    await axios
      .post(
        "api/auth/login",
        {
          username: loginData.username,
          password: loginData.password
        },
        {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      )
      .then(response => {
        if (response.status === 200) {
          setAuth({
            isAuthenticated: true,
            authUser: response.data.username,
            authUserId: response.data.id
          })
          history.push("/")
        }
      })
      .catch(error => {
        console.log("login error", error)
      })
    setLoginData({ username: "", password: "" })
  }

  return (
    <Container>
      <Form onSubmit={e => handleSubmit(e)}>
        <LoginForm />
      </Form>
    </Container>
  )
}

export default AuthLogin
