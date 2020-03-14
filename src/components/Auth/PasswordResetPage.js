import React, { useState, useEffect, Fragment } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Alert, Form, Button, Container, Card } from "react-bootstrap"
import PasswordResetPageButton from "./PasswordResetPageButton"
import PasswordCheckbox from "./PasswordCheckbox"
import { palette } from "../../helpers"
import axios from "axios"

const PasswordResetPage = () => {
  let params = useParams()
  let history = useHistory()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: ""
  })
  const [updated, setUpdated] = useState(false)
  const [errors, setErrors] = useState({
    server: "",
    passwordConfirmation: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { warning, warningLight, danger, dangerLight } = palette

  const dataInitialState = {
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  useEffect(() => {
    getResetData()
  }, [])

  const getResetData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/auth/reset", {
        params: { resetPasswordToken: params.id }
      })
      if (response.data.message === "password reset link a-ok") {
        setFormData(prevState => {
          return { ...prevState, username: response.data.username }
        })
        setUpdated(false)
        setErrors({ server: "" })
      } else {
        setFormData(dataInitialState)
        setErrors({ server: "" })
        setUpdated(false)
        history.push("/")
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const passwordValidation = password => {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    let result = true
    if ((password.length && !password.match(passw)) || !password.length) {
      result = false
      return result
    }
    if (password.length && !password.match(passw)) {
      setErrors(prevState => {
        return {
          ...prevState,
          password:
            "7-20 characters, including one number, one uppercase and one lowercase letter"
        }
      })
    } else if (password.length && password.match(passw)) {
      setErrors(prevState => {
        return {
          ...prevState,
          password: ""
        }
      })
    }
  }

  const passwordConfirmationValidation = (password, passwordConfirmation) => {
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      setErrors(prevState => {
        return {
          ...prevState,
          passwordConfirmation: "Passwords do not match"
        }
      })
    } else if (
      (!password && !passwordConfirmation) ||
      password === passwordConfirmation
    ) {
      setErrors(prevState => {
        return {
          ...prevState,
          passwordConfirmation: ""
        }
      })
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    e.persist()
    setFormData(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
    let password = ""
    let passwordConfirmation = ""
    if (e.target.name === "password") {
      password = e.target.value
    } else if (e.target.name === "passwordConfirmation") {
      passwordConfirmation = e.target.value
    }
    if (name === "password" || name === "passwordConfirmation") {
      passwordConfirmationValidation(
        password ? password : formData.password,
        passwordConfirmation
          ? passwordConfirmation
          : formData.passwordConfirmation
      )
      passwordValidation(password)
    }
  }

  return (
    <Container>
      {updated && (
        <div>
          <Alert
            style={{ maxWidth: "500px" }}
            className="mx-auto mt-5"
            variant="success"
          >
            Password successfully updated
          </Alert>

          <Button
            onClick={() => {
              history.push("/")
            }}
            className="mx-auto"
            style={{ maxWidth: "500px" }}
            block
          >
            Go to the main page
          </Button>
        </div>
      )}
      {!updated && (
        <Card className="mx-auto mt-5" style={{ maxWidth: "500px" }}>
          {isSending ? (
            <Card.Header
              style={{ backgroundColor: warningLight, color: warning }}
            >
              Request pending...
            </Card.Header>
          ) : errors.server ? (
            <Card.Header
              style={{ backgroundColor: dangerLight, color: danger }}
            >
              {errors.server}
            </Card.Header>
          ) : (
            <Card.Header>Password Reset Form</Card.Header>
          )}

          <Card.Body>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={formData.username}
                name="username"
                onChange={e => e.preventDefault()}
                type="text"
                placeholder={
                  isLoading ? "Fetching user data..." : "Enter username"
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formData.password}
                name="password"
                onChange={e => handleChange(e)}
                type={!isVisible ? "password" : "text"}
                placeholder="Password"
                required
              />
              <Form.Text className="text-danger">{errors.password}</Form.Text>
              <PasswordCheckbox
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
            </Form.Group>
            <Form.Group controlId="formPasswordConfirm">
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control
                value={formData.passwordConfirmation}
                name="passwordConfirmation"
                onChange={e => handleChange(e)}
                type="password"
                placeholder="Password"
                required
              />
              <Form.Text className="text-danger">
                {errors.passwordConfirmation}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPasswordCheck"></Form.Group>
            {!errors.server && (
              <PasswordResetPageButton
                isSending={isSending}
                setIsSending={setIsSending}
                setUpdated={setUpdated}
                setErrors={setErrors}
                dataInitialState={dataInitialState}
                errors={errors}
                formData={formData}
              />
            )}
            {errors.server && !updated && (
              <Fragment>
                <Button
                  onClick={() => {
                    history.push("/reset/credentials")
                  }}
                >
                  New Reset Request
                </Button>
                <Button
                  className="mx-3"
                  onClick={() => {
                    history.push("/")
                  }}
                >
                  Go to the Home Page
                </Button>
              </Fragment>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default PasswordResetPage
