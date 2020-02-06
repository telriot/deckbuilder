import React, { useContext } from "react"
import { Form, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import SignupForm from "./Auth/SignupForm"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"

const Signup = () => {
  const { signupData, setSignupData } = useContext(AuthContext)
  let history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()

    axios
      .post(
        "api/auth/signup",
        {
          username: signupData.username,
          email: signupData.email,
          password: signupData.password
        },
        {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      )
      .then(response => {
        if (!response.data.errmsg) {
          console.log("successful signup")
          history.push("/")
        } else {
          console.log(response.data.errmsg)
        }
      })
      .catch(error => {
        console.log(error)
      })
    setSignupData({ username: "", email: "", password: "" })
  }

  return (
    <Container>
      <Form onSubmit={e => handleSubmit(e)}>
        <SignupForm />
      </Form>
    </Container>
  )
}

export default Signup
