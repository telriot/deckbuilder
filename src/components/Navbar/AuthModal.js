import React, { useContext } from "react"
import { Container, Form, Modal, Alert } from "react-bootstrap"
import { AuthContext } from "../../contexts/AuthContext"
import LoginForm from "../Auth/LoginForm"
import LoginButton from "../Auth/LoginButton"
import SignupForm from "../Auth/SignupForm"
import SignupButton from "../Auth/SignupButton"

const AuthModal = props => {
  const { validation, isLoading } = useContext(AuthContext)
  const formTitle = props.type
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {!isLoading
            ? formTitle
            : formTitle === "Login"
            ? "Logging you in..."
            : "Signing you up..."}
        </Modal.Title>
      </Modal.Header>
      {validation.login.error && (
        <Alert variant="danger">{validation.login.error}</Alert>
      )}
      <Modal.Body>
        <Container>
          {props.type === "Login" && (
            <Form>
              <LoginForm />
              <LoginButton />
            </Form>
          )}
          {props.type === "Signup" && (
            <Form>
              <SignupForm />
              <SignupButton />
            </Form>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default AuthModal
