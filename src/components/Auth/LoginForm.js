import React, { Fragment, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Form, Button } from "react-bootstrap"

const LoginForm = () => {
  const { loginData, setLoginData } = useContext(AuthContext)

  const handleChange = e => {
    e.persist()
    setLoginData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default LoginForm
