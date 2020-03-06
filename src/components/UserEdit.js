import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Form, Button, Alert, Row, Col, Card } from "react-bootstrap"
import { UserContext } from "../contexts/UserContext"
import axios from "axios"
import UserDeckDisplay from "./User/UserDeckDisplay"
import AngleIcon from "./User/AngleIcon"
import AvatarCard from "./User/AvatarCard"
import AboutCardBody from "./User/AboutCardBody"
import MTGInfoCardBody from "./User/MTGInfoCardBody"
import ContactsCardBody from "./User/ContactsCardBody"

const UserEdit = () => {
  const { setVisibility, visibilityInitialState, user, getUser } = useContext(
    UserContext
  )
  const [validation, setValidation] = useState([])
  const [show, setShow] = useState(true)
  const params = useParams()

  useEffect(() => {
    setVisibility(visibilityInitialState)
    getUser()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:3000/api/users/${params.id}`,
        {
          user: user
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
          <AvatarCard origin="edit" />
          <Form onSubmit={e => handleSubmit(e)}>
            <Card className="border-0 bg-light mb-3 ">
              <Card.Header data-name="about" className="border-0" as="h6">
                About me
                <AngleIcon origin="about" />
              </Card.Header>
              <AboutCardBody origin="edit" />
            </Card>
            <Card className="border-0 bg-light mb-3 ">
              <Card.Header data-name="info" className="border-0" as="h6">
                MTG Info
                <AngleIcon origin="info" />
              </Card.Header>
              <MTGInfoCardBody origin="edit" />
            </Card>
            <Card className="border-0 bg-light mb-3 ">
              <Card.Header data-name="contacts" className="border-0" as="h6">
                Contacts
                <AngleIcon origin="contacts" />
              </Card.Header>
              <ContactsCardBody origin="edit" />
            </Card>
            <Card className="border-0 mb-3 bg-light">
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
