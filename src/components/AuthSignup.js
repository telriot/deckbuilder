import React, { useContext } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"

const Signup = () => {
  const { signupData, setSignupData } = useContext(AuthContext)
  let history = useHistory()

  const handleChange = e => {
    e.persist()
    setSignupData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

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
        console.log("signup error: ")
        console.log(error)
      })
    setSignupData({ username: "", email: "", password: "" })
  }

  return (
    <Container>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={signupData.username}
            name="username"
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Enter username"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={signupData.email}
            name="email"
            onChange={e => handleChange(e)}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={signupData.password}
            name="password"
            onChange={e => handleChange(e)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Signup
