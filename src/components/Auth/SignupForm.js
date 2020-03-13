import React, { Fragment, useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Form, Alert } from "react-bootstrap"
import PasswordCheckbox from "./PasswordCheckbox"

const SignupForm = () => {
  const {
    signupData,
    setSignupData,
    validation,
    handleValidation,
    signupServerError
  } = useContext(AuthContext)
  const [isVisible, setIsVisible] = useState(false)

  let password = ""
  let username = ""
  let passwordConfirmation = ""
  let email = ""

  const handleChange = e => {
    e.persist()
    setSignupData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })

    if (e.target.name === "username") {
      username = e.target.value
    } else if (e.target.name === "password") {
      password = e.target.value
    } else if (e.target.name === "passwordConfirmation") {
      passwordConfirmation = e.target.value
    } else if (e.target.name === "email") {
      email = e.target.value
    }

    handleValidation(
      username ? username : signupData.username,
      password ? password : signupData.password,
      passwordConfirmation
        ? passwordConfirmation
        : signupData.passwordConfirmation,
      email ? email : signupData.email
    )
  }

  return (
    <Fragment>
      {signupServerError && (
        <Alert variant="danger">Something went wrong, please try again.</Alert>
      )}
      <Form.Group controlId="formUsername">
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

      <Form.Group controlId="formEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          value={signupData.email}
          name="email"
          onChange={e => handleChange(e)}
          type="email"
          placeholder="Email address, i.e. bob@jund.it"
          required
        />

        <Form.Text className="text-danger">{validation.email.error}</Form.Text>
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-2">
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
        <PasswordCheckbox isVisible={isVisible} setIsVisible={setIsVisible} />
      </Form.Group>

      <Form.Group controlId="formPasswordConfirm">
        <Form.Label>Confirm your password</Form.Label>
        <Form.Control
          value={signupData.passwordConfirmation}
          name="passwordConfirmation"
          onChange={e => handleChange(e)}
          type="password"
          placeholder="Password"
          required
        />
        <Form.Text className="text-danger">
          {validation.passwordConfirmation.error}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formPasswordCheck"></Form.Group>
    </Fragment>
  )
}

export default SignupForm
