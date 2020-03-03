import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Container, Form, Button, Alert, Row, Col, Card } from "react-bootstrap"
import Avatar from "react-avatar"
import axios from "axios"
import UserDeckDisplay from "./User/UserDeckDisplay"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

const UserEdit = () => {
  const [userInfo, setUserInfo] = useState({
    user: {},
    description: "",
    mtgoUsername: "",
    email: "",
    arenaUsername: "",
    dciNumber: "",
    country: "",
    city: "",
    twitter: "",
    twitch: "",
    youtube: ""
  })
  const [visibility, setVisibility] = useState({
    about: "d-none",
    info: "d-none",
    contacts: "d-none"
  })
  const [validation, setValidation] = useState([])
  const [show, setShow] = useState(true)
  const params = useParams()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const userInfo = await axios.get(
      `http://localhost:3000/api/users/${params.id}`
    )
    const {
      description,
      mtgoUsername,
      arenaUsername,
      email,
      dciNumber,
      country,
      city,
      twitter,
      twitch,
      youtube
    } = userInfo.data
    setUserInfo(prevState => {
      return {
        ...prevState,
        user: userInfo.data,
        description,
        mtgoUsername,
        arenaUsername,
        email,
        dciNumber,
        country,
        city,
        twitter,
        twitch,
        youtube
      }
    })
  }

  const handleChange = e => {
    e.persist()
    setUserInfo(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const {
      description,
      mtgoUsername,
      arenaUsername,
      email,
      dciNumber,
      country,
      city,
      twitter,
      twitch,
      youtube
    } = userInfo
    try {
      await axios.put(
        `http://localhost:3000/api/users/${params.id}`,
        {
          description,
          mtgoUsername,
          arenaUsername,
          email,
          dciNumber,
          country,
          city,
          twitter,
          twitch,
          youtube
        },
        {
          "Content-Type": "raw"
        }
      )
    } catch (error) {
      let errArray = []
      for (let err of error.response.data.errors) {
        errArray.push(Object.values(err))
      }
      setValidation(errArray)
    }
    getUser()
  }

  const errDisplay = () => {
    let displayArray = []
    for (let err of validation) {
      displayArray.push(<p>{err}</p>)
    }
    return displayArray
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
      {!!validation.length && show && (
        <Alert
          className="pb-0"
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          {errDisplay()}
        </Alert>
      )}

      <Row>
        <Col lg={3}>
          <Card className="border-0 pt-3 mb-3 bg-light d-flex flex-column align-items-center">
            <Avatar name={userInfo.user.username} />
            <h5 className="mt-2">
              {" "}
              <Link to={`/users/${params.id}`}>
                {userInfo.user && userInfo.user.username}
              </Link>{" "}
              settings
            </h5>
          </Card>
          <Form onSubmit={e => handleSubmit(e)}>
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
                About me
                {arrowIconSpan("about")}
              </Card.Header>
              <Card.Body
                className={visibility.about}
                style={{ fontSize: "0.8rem" }}
              >
                <Form.Group controlId="formEmailAddress">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    size="sm"
                    type="email"
                    name="email"
                    placeholder="i.e. bob@jund.it"
                    value={userInfo.email}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country of Origin</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="country"
                    value={userInfo.country}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City of residence</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="city"
                    value={userInfo.city}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                  <Form.Label>Your Description</Form.Label>
                  <Form.Control
                    size="sm"
                    type="textarea"
                    name="description"
                    value={userInfo.description}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="border-0 bg-light mb-3 ">
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
                <Form.Group controlId="formMTGO">
                  <Form.Label>MTGO Username</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="mtgoUsername"
                    value={userInfo.mtgoUsername}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formArena">
                  <Form.Label>Arena Username</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="arenaUsername"
                    value={userInfo.arenaUsername}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formDCI">
                  <Form.Label>DCI Number</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="dciNumber"
                    value={userInfo.dciNumber}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="border-0 bg-light mb-3 ">
              <Card.Header
                data-name="contacts"
                className="border-0"
                as="h6"
                onClick={e => {
                  const target = e.target.dataset.name
                  return toggleVisibility(target)
                }}
              >
                Contacts
                {arrowIconSpan("contacts")}
              </Card.Header>
              <Card.Body
                className={visibility.contacts}
                style={{ fontSize: "0.8rem" }}
              >
                <Form.Group controlId="formTwitter">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    size="sm"
                    type="url"
                    pattern=".*\.twitter\..*"
                    placeholder="https://www.twitter.com/example"
                    title="The URL must be that of a Twitter feed"
                    name="twitter"
                    value={userInfo.twitter}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formTwitch">
                  <Form.Label>Twitch</Form.Label>
                  <Form.Control
                    size="sm"
                    type="url"
                    pattern=".*\.twitch\..*"
                    placeholder="https://www.twitch.tv/example"
                    title="The URL must be that of a Twitch stream"
                    name="twitch"
                    value={userInfo.twitch}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formYoutube">
                  <Form.Label>Youtube</Form.Label>
                  <Form.Control
                    size="sm"
                    type="url"
                    pattern=".*\.youtube\..*"
                    placeholder="https://www.youtube.com/example"
                    title="The URL must be that of a Youtube channel"
                    name="youtube"
                    value={userInfo.youtube}
                    onChange={e => handleChange(e)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="border-0 bg-light">
              <Card.Body
                className="d-flex justify-content-center"
                style={{ fontSize: "0.8rem" }}
              >
                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </Card.Body>
            </Card>
          </Form>
        </Col>
        <Col lg={9}>
          <UserDeckDisplay params={params}></UserDeckDisplay>
        </Col>
      </Row>
    </Container>
  )
}

export default UserEdit
