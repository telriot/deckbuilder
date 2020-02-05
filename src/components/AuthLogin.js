import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { Container, Form, Button } from "react-bootstrap"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"

const AuthLogin = () => {
  const { setAuth, loginData, setLoginData } = useContext(AuthContext)

  let history = useHistory()

  const handleChange = e => {
    e.persist()
    setLoginData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await axios
      .post(
        "api/auth/login",
        {
          email: loginData.email,
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
    setLoginData({ email: "", password: "" })
  }

  return (
    <Container>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={loginData.email}
            name="email"
            onChange={e => handleChange(e)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={loginData.password}
            name="password"
            onChange={e => handleChange(e)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default AuthLogin
