import React, { useContext, Fragment } from "react"
import { Card, Form } from "react-bootstrap"
import { UserContext } from "../../contexts/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { faTwitch } from "@fortawesome/free-brands-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"

const ContactsCardBody = props => {
  const { origin } = props
  const { user, setUser, hover, setHover, visibility } = useContext(UserContext)

  const handleChange = e => {
    e.persist()
    setUser(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  const contactsInfoForm = (media, text) => {
    return (
      <Form.Group controlId={`form${media}`}>
        <Form.Label>{text}</Form.Label>
        <Form.Control
          size="sm"
          type="url"
          pattern={`.*\.${media}\..*`}
          placeholder={`https://www.${media}.com/example"`}
          title={`The URL must be that of a ${text} page`}
          name={media}
          value={user[media]}
          onChange={e => handleChange(e)}
        />
      </Form.Group>
    )
  }

  const mediaIcon = (link, faIcon, origin) => {
    if (link) {
      return (
        <a href={link}>
          <Card.Text>
            <FontAwesomeIcon
              style={
                hover === origin
                  ? {
                      fontSize: "2rem",
                      color: "#2056B3",
                      cursor: "pointer",
                      transition: "color 0.15s ease-in-out"
                    }
                  : { fontSize: "2rem", color: "#007bff" }
              }
              icon={faIcon}
              onMouseEnter={() => setHover(origin)}
              onMouseLeave={() => setHover("")}
            />
          </Card.Text>
        </a>
      )
    } else {
      return (
        <Card.Text>
          <FontAwesomeIcon
            style={{ fontSize: "2rem", color: "#6c757d" }}
            icon={faIcon}
          />
        </Card.Text>
      )
    }
  }

  return (
    <Card.Body className={visibility.contacts} style={{ fontSize: "0.8rem" }}>
      {origin === "edit" ? (
        <Fragment>
          {contactsInfoForm("twitter", "Twitter")}
          {contactsInfoForm("twitch", "Twitch")}
          {contactsInfoForm("youtube", "Youtube")}
        </Fragment>
      ) : (
        <div className="d-flex justify-content-around">
          {mediaIcon(user.twitter, faTwitterSquare, "twitter")}
          {mediaIcon(user.twitch, faTwitch, "twitch")}
          {mediaIcon(user.youtube, faYoutube, "youtube")}
        </div>
      )}
    </Card.Body>
  )
}

export default ContactsCardBody
