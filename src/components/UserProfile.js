import React, { useEffect, useState } from "react"
import { Container, Row, Card, Col } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { faTwitch } from "@fortawesome/free-brands-svg-icons"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import Avatar from "react-avatar"
import DeckCard from "./DeckCard"
import UserDeckDisplay from "./User/UserDeckDisplay"
import axios from "axios"

const UserProfile = () => {
  const params = useParams()
  const [user, setUser] = useState({})
  const [decks, setDecks] = useState([])
  const [decksDisplay, setDecksDisplay] = useState([])
  const [visibility, setVisibility] = useState({
    about: "d-none",
    info: "d-none",
    contacts: "d-none"
  })

  const mediaIcon = (link, faIcon) => {
    console.log(link)
    if (link) {
      return (
        <a href={link}>
          <Card.Text>
            <FontAwesomeIcon
              style={{ fontSize: "2rem", color: "#007bff" }}
              icon={faIcon}
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

  const angleRightIcon = (
    <FontAwesomeIcon
      style={{ fontSize: "1rem", color: "#007bff" }}
      icon={faAngleRight}
    />
  )

  const angleDownIcon = (
    <FontAwesomeIcon
      style={{ fontSize: "1rem", color: "#007bff" }}
      icon={faAngleDown}
    />
  )

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const userInfo = await axios.get(`/api/users/${params.id}`)
    setUser(userInfo.data)
  }

  const toggleVisibility = name => {
    visibility[name] === "d-none"
      ? setVisibility(prevState => {
          return { ...prevState, [name]: "d-inline-block" }
        })
      : setVisibility(prevState => {
          return { ...prevState, [name]: "d-none" }
        })
  }

  const arrowIconSpan = dataName => {
    if (visibility[dataName] === "d-inline-block") {
      return (
        <span
          onClick={() => toggleVisibility(dataName)}
          className="float-right"
        >
          {angleRightIcon}
        </span>
      )
    } else {
      return (
        <span
          onClick={() => toggleVisibility(dataName)}
          className="float-right"
        >
          {angleDownIcon}
        </span>
      )
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <Card className="border-0 pt-3 mb-3 bg-light d-flex flex-column align-items-center">
            <Avatar name={user.username} />
            <h5 className="mt-2">{user.username}</h5>
          </Card>
          <Card className="border-0 bg-light mb-3 ">
            <Card.Header
              data-name="about"
              className="border-0"
              as="h6"
              onClick={e => {
                const target = e.target.dataset.name
                return toggleVisibility(target)
              }}
            >
              About {user.username}
              {arrowIconSpan("about")}
            </Card.Header>
            <Card.Body
              className={visibility.about}
              style={{ fontSize: "0.8rem" }}
            >
              <Card.Text>'{user.description}'</Card.Text>
              {user.country && <Card.Text>From {user.country}</Card.Text>}
              {user.city && <Card.Text>Lives in {user.city}</Card.Text>}
            </Card.Body>
          </Card>

          {(user.arenaUsername || user.mtgoUsername || user.dciNumber) && (
            <Card className="mb-3 border-0 bg-light">
              <Card.Header
                data-name="info"
                className="border-0"
                as="h6"
                onClick={e => {
                  const target = e.target.dataset.name
                  return toggleVisibility(target)
                }}
              >
                MTG Info
                {arrowIconSpan("info")}
              </Card.Header>
              <Card.Body
                className={visibility.info}
                style={{ fontSize: "0.8rem" }}
              >
                {user.arenaUsername && (
                  <Card.Text>
                    <span className="text-muted">Arena: </span>
                    {user.arenaUsername}
                  </Card.Text>
                )}
                {user.mtgoUsername && (
                  <Card.Text>
                    {" "}
                    <span className="text-muted">MTGO: </span>{" "}
                    {user.mtgoUsername}
                  </Card.Text>
                )}
                {user.dciNumber && (
                  <Card.Text>
                    {" "}
                    <span className="text-muted">DCI #: </span> {user.dciNumber}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          )}

          <Card className="mb-3 border-0 bg-light">
            <Card.Header className="border-0" as="h6">
              Contacts
            </Card.Header>
            <Card.Body className="d-flex justify-content-around pb-0">
              {mediaIcon(user.twitter, faTwitterSquare)}

              {mediaIcon(user.twitch, faTwitch)}

              {mediaIcon(user.youtube, faYoutube)}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <UserDeckDisplay params={params}></UserDeckDisplay>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile
