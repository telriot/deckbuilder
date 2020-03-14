import React, { useState, Fragment } from "react"
import { Form, Button, Card, Container, Spinner } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { emailRegex, palette } from "../../helpers"
const PasswordResetForm = () => {
  const [email, setEmail] = useState("")
  const [messageFromServer, setMessageFromServer] = useState("")
  const [errors, setErrors] = useState({ email: "", server: "" })
  const [isSending, setIsSending] = useState(false)
  const errorsInitialState = { email: "", server: "" }
  const {
    dangerLight,
    danger,
    warningLight,
    warning,
    successLight,
    success
  } = palette
  let history = useHistory()

  const handleSubmit = async () => {
    setIsSending(true)

    if (!email.length || (email.length && !email.match(emailRegex))) {
      setIsSending(false)
      setErrors(prevState => {
        return {
          ...prevState,
          email: "Email address is not valid"
        }
      })
    } else if (email.length && email.match(emailRegex)) {
      setErrors({
        server: "",
        email: ""
      })
      try {
        const response = await axios.post("/api/auth/forgotPassword", {
          email
        })
        console.log(response)
        if (response.data === "recovery email sent") {
          setIsSending(false)
          setErrors(errorsInitialState)
          setMessageFromServer("Recovery email succesfully sent")
        }
      } catch (error) {
        console.log(error.response.data)
        if (error.response.data === "email not in db") {
          setIsSending(false)
          setErrors(prevState => {
            return {
              ...prevState,
              server: "Email not found"
            }
          })
        }
      }
    }
  }

  return (
    <Container>
      <Card className="mx-auto mt-5" style={{ maxWidth: "500px" }}>
        {messageFromServer ? (
          <Card.Header
            className="m-0"
            style={{ backgroundColor: successLight, color: success }}
          >
            {messageFromServer}
          </Card.Header>
        ) : isSending ? (
          <Card.Header
            style={{ backgroundColor: warningLight, color: warning }}
          >
            Request pending...
          </Card.Header>
        ) : errors.server || errors.email ? (
          <Card.Header style={{ backgroundColor: dangerLight, color: danger }}>
            Request failed
          </Card.Header>
        ) : (
          <Card.Header>Password Reset Request</Card.Header>
        )}

        <Card.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              value={email}
              name="email"
              onChange={e => {
                setEmail(e.target.value)
                setErrors(prevState => {
                  return { ...prevState, email: "" }
                })
              }}
              type="text"
              placeholder="Your profile's email address"
            />

            {errors.server && (
              <Form.Text className="text-danger">{errors.server}</Form.Text>
            )}
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Button disabled={isSending} onClick={() => handleSubmit()}>
            {isSending ? (
              <Fragment>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Sending...
              </Fragment>
            ) : (
              <Fragment>Send Request</Fragment>
            )}
          </Button>
          {errors.server && <Button className="mx-3">Register</Button>}
          {messageFromServer && (
            <Button className="mx-3" onClick={() => history.push("/")}>
              Go to the Home Page
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default PasswordResetForm
