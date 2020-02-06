import React, { Fragment, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Form, Button } from "react-bootstrap"

const SignupForm = () => {
  const { signupData, setSignupData } = useContext(AuthContext)

  const handleChange = e => {
    e.persist()
    setSignupData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default SignupForm
