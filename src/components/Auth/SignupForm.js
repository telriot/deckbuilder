import React, { Fragment, useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Form } from "react-bootstrap"

const SignupForm = () => {
  const {
    signupData,
    setSignupData,
    validation,
    handleValidation
  } = useContext(AuthContext)
  const [isVisible, setIsVisible] = useState(false)

  function handleCheck(e) {
    e.persist()
    console.log(e)
    setIsVisible(prevState => !prevState)
  }

  let password = ""
  let username = ""

  const handleChange = e => {
    e.persist()
    setSignupData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
    if (e.target.name === "username") {
      console.log("setUsername")
      username = e.target.value
    } else if (e.target.name === "password") {
      console.log("setPassword")
      password = e.target.value
    }
    handleValidation(
      username ? username : validation.username,
      password ? password : validation.password
    )
  }

  const Checkbox = () => (
    <Form.Check
      type="checkbox"
      label="Visible"
      onChange={e => handleCheck(e)}
      checked={isVisible}
    />
  )

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

        <Form.Text className="text-danger">
          {validation.username.error}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={signupData.password}
          name="password"
          onChange={e => handleChange(e)}
          type={!isVisible ? "password" : "text"}
          placeholder="Password"
          required
        />

        <Form.Text className="text-danger">
          {validation.password.error}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPasswordConfirm">
        <Form.Label>Confirm your password</Form.Label>
        <Form.Control
          value={signupData.passwordConfirmation}
          name="passwordConfirmation"
          onChange={e => handleChange(e)}
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Form.Group controlId="formPasswordCheck">
        <Checkbox />
      </Form.Group>
    </Fragment>
  )
}

export default SignupForm
