import React, { useContext, Fragment } from "react"
import { Card, Form } from "react-bootstrap"
import { UserContext } from "../../contexts/UserContext"

const AboutCardBody = props => {
  const { origin } = props
  const { user, setUser, visibility } = useContext(UserContext)

  const handleChange = e => {
    e.persist()
    setUser(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const aboutDataForm = (name, type, text, placeholder) => {
    return (
      <Form.Group controlId={`form${name}`}>
        <Form.Label>{text}</Form.Label>
        <Form.Control
          size="sm"
          type={type}
          name={name}
          placeholder={placeholder}
          value={user[name]}
          onChange={e => handleChange(e)}
        />
      </Form.Group>
    )
  }

  return (
    <Card.Body className={visibility.about} style={{ fontSize: "0.8rem" }}>
      {origin === "edit" ? (
        <Fragment>
          {aboutDataForm("email", "email", "Email Address", "i.e. bob@jund.it")}
          {aboutDataForm("country", "text", "Country of origin")}
          {aboutDataForm("city", "text", "City of residence")}
          {aboutDataForm("description", "text", "Your Description")}
          {aboutDataForm(
            "avatar",
            "url",
            "Avatar URL",
            "https://www.w3schools.com/w3images/avatar2.png"
          )}
        </Fragment>
      ) : (
        <Fragment>
          {user.description && <Card.Text>'{user.description}'</Card.Text>}
          {user.country && <Card.Text>From {user.country}</Card.Text>}
          {user.city && <Card.Text>Lives in {user.city}</Card.Text>}
        </Fragment>
      )}
    </Card.Body>
  )
}

export default AboutCardBody
