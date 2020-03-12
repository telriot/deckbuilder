import React, { Fragment, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Form, Alert } from "react-bootstrap"

const LoginForm = () => {
  const { loginData, setLoginData, signupSuccess } = useContext(AuthContext)

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
      {signupSuccess && <Alert variant="success">Signup Successful!</Alert>}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={loginData.username}
          name="username"
          onChange={e => handleChange(e)}
          type="text"
          placeholder="Enter your username"
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
    </Fragment>
  )
}

export default LoginForm
